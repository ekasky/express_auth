const validator = require("validator");
const bcrypt = require("bcrypt");
const user = require("../models/User");
const passport = require("passport");

async function localRegisterController(req, res) {

    const { email, username, password, first_name, last_name, gender } = req.body;

    const response = {

        "success": false,
        "errors": {}

    };

    // Ensure all required feilds are supplied by the user
   
    if(!email) {

        response.errors.email = "Email is required";

    }

    if(!username) {

        response.errors.username = "Username is required";

    }

    if(!password) {

        response.errors.password = "Password is required";

    }

    if(!first_name) {

        response.errors.first_name = "First name is required";

    }

    if(!last_name) {

        response.errors.last_name = "Last name is required";

    }

    if(!gender) {
        
        response.errors.gender = "Gender is required";

    }

    if(Object.keys(response.errors).length !== 0) {

        return res.status(400).json(response);

    }

    if(!["male", "female", "other"].includes(gender)) {

        response.errors.gender = "Invalid Gender";

    }

    // Ensure email address is a valid email format
    if(!validator.isEmail(email)) {

        response.errors.email = "Invalid email address";

        return res.status(400).json(response);

    }

    // Ensure password is strong
    if(!validator.isStrongPassword(password)) {

        response.errors.password = "Password to weak";

        return res.status(400).json(response);

    }

    // Ensure the username or email is not already taken

    const findEmail = await user.findOne({ where: {email} });
    const findUser = await user.findOne({ where: {username} });

    if(findEmail) {

        response.errors.email = "Email already taken";

    }

    if(findUser) {

        response.errors.username = "Username already taken";

    }

    if(Object.keys(response.errors).length !== 0) {

        return res.status(400).json(response);

    }

    try{

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user in the db
        const newUser = await user.create({
            email,
            username,
            password: hash,
            first_name,
            last_name,
            gender
        });

        response.success = true;

        return res.status(201).json(response);

    }
    catch(error) {
        response.errors.server = "Internal Server Error";
        return res.status(500).json(response);
    }

}

function localLoginController(req, res, next) {

    passport.authenticate("local", (error, user, info) => {

        if(error) {
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }

        if(!user) {
            return res.status(401).json({
                info
            });
        }

        req.logIn(user, (error) => {

            if(error) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }

            res.status(200).json({
                message: "Login Successful",
                user
            });

        });

    })(req, res, next);

}

function logoutController(req, res, next) {

    // Check if the user is logged in
    if(!req.isAuthenticated || !req.isAuthenticated()) {

        return res.status(200).json({
            message: "No user logged in"
        });

    }

    // Logout user
    req.logout( (error) => {

        if(error) {

            return next(error);

        }

        if(req.session) {

            req.session.destroy((error) => {

                if(error) {
                    return res.status(500).json({
                        message: "Failed to logout"
                    });
                }

                res.clearCookie("connect.sid");
                return res.status(200).json({
                    message: "Logout Successful"
                });

            });

        }
        else {

            res.status(200).json({
                message: "Logout successful, but no session found"
            });

        }

    } );

}

function isAuthenticatedController(req, res) {

    if(req.isAuthenticated()) {

        res.status(200).json({
            
            isAuthenticated: true

        });

    }
    else {

        res.status(401).json({

            isAuthenticated: false

        });

    }

}

module.exports = {localRegisterController, localLoginController, logoutController, isAuthenticatedController};
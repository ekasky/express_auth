const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy({usernameField: "email"},

    async (email, password, done) => {

        try {
            
            // Look for user with the given email
            const _user = await user.findOne({where: {email}});

            if(!_user) {
                return done(null, false, { message: "Email or password invalid" });
            }

            // Check if password matches password on file
            const passwordMatch = await bcrypt.compare(password, _user.password);

            if(!passwordMatch) {
                return done(null, false, { message: "Email or password invalid" });
            }

            return done(null, _user);

        }
        catch(error) {

            return done(error);

        }

    }

));
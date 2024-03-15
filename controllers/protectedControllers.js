const user = require("../models/User");

async function dashboardController(req, res) {

    // Get the user data from the db
    try {

        const userId = req.user.id;

        // Use the id to find the user in the db
        const userInfo = await user.findOne({where: {id: userId}});

        if(!userInfo) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({

            id: userInfo.id,
            email: userInfo.email,
            username: userInfo.username

        });

    }
    catch(error) {

        res.status(500).json({

            message: "Internal Server Error"

        });

    }

}

module.exports = { dashboardController };
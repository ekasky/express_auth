require("dotenv").config();

module.exports = {

    PORT : process.env.PORT,
    DB_HOST : process.env.DB_HOST, 
    DB_USER : process.env.DB_USER, 
    DB_PASS : process.env.DB_PASS, 
    DB_NAME : process.env.DB_NAME, 
    TIME : 86400000,                                            // One day
    SESSION_SECRET : process.env.SESSION_SECRET,

};
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { v4: uuidv4 } = require("uuid");
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, TIME, SESSION_SECRET } = require("./config");

const store = new MySQLStore({

    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    clearExpired: true,
    checkExpirationInterval: TIME,
    expiration: TIME

});

const expressSession = session({

    key: "auth",
    secret: SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    genid: () => uuidv4(),
    cookie: {
        maxAge: TIME, 
        httpOnly: true,
        sameSite: "strict"
    }

});

module.exports = expressSession;
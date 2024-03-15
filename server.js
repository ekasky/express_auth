const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config.js");
const authRoutes = require("./routes/authRoutes.js");
const protectedRoutes = require("./routes/protectedRoutes.js");
const expressSession = require("./config/expressSession.js"); 
const passport = require("passport");
const localStrategy = require("./strategies/localStrategy.js"); 
const user = require("./models/User.js");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((_user, done) => {
    done(null, _user.id); // Serialize user by their ID
});

passport.deserializeUser((id, done) => {
    user.findByPk(id) // Use findByPk instead of findById for Sequelize
        .then(_user => {
            done(null, _user); // Success, user found
        })
        .catch(err => {
            done(err, null); // Error occurred
        });
});


app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
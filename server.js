const express = require("express");
const { PORT } = require("./config.js");
const authRoutes = require("./routes/authRoutes.js"); 

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
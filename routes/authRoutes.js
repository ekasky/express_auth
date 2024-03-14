const express = require("express");
const router = express.Router();

const { localRegisterController } = require("../controllers/authControllers");

router.get("/test", (req, res) => res.status(200).json({message: "This is a test route"}));

router.post("/local/register", localRegisterController);

module.exports = router;
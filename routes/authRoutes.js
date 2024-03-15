const express = require("express");
const router = express.Router();

const { localRegisterController, localLoginController, logoutController } = require("../controllers/authControllers");

router.get("/test", (req, res) => res.status(200).json({message: "This is a test route"}));

router.post("/local/register", localRegisterController);
router.post("/local/login", localLoginController);
router.post("/logout", logoutController);

module.exports = router;
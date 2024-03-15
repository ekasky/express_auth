const express = require("express");
const router = express.Router();

const { localRegisterController, localLoginController, logoutController, isAuthenticatedController } = require("../controllers/authControllers");

router.get("/test", (req, res) => res.status(200).json({message: "This is a test route"}));

router.post("/local/register", localRegisterController);
router.post("/local/login", localLoginController);
router.post("/logout", logoutController);
router.get("/isAuthenticated", isAuthenticatedController);

module.exports = router;
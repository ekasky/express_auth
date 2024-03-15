const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const { dashboardController } = require("../controllers/protectedControllers");

router.use(isAuthenticated);

router.get("/test", (req, res) => res.status(200).json({message: "Test Route"}));
router.get("/dashboard", dashboardController);

module.exports = router;
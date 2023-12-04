const express = require("express");
const milestonesController = require("../controllers/milestonesController");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/", authenticateUser, milestonesController.getAllMilestones);

module.exports = router;
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  HandleCurrentMilestone,
  HandleGetAllMillestones,
} = require("../controllers/milestoneController");

router.get("/", authenticateUser, HandleCurrentMilestone);

router.get("/", authenticateUser, HandleGetAllMillestones);

module.exports = router;

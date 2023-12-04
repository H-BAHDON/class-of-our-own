const express = require("express");
const ReposController = require("../controllers/reposController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes
router.get("/", authenticateUser, ReposController.handleRepos);

module.exports = router;

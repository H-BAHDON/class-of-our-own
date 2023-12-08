const express = require("express");
const ReposController = require("../controllers/reposController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes
router.get("/", authenticateUser, ReposController.getAllRepos);
router.get("/pull-request", authenticateUser, ReposController.getTotalPullRequest);
router.get("/with-Pull-Reuqest", authenticateUser, ReposController.getWithPullRequest);
router.get("/with-out-Pull-Reuqest", authenticateUser, ReposController.getWithOutPullRequest);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const { handleSignpost } = require("../controllers/signpostController");

const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/", authenticateUser, handleSignpost);

module.exports = router;

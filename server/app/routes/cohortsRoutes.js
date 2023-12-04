const express = require('express');
const cohortsController = require('../controllers/cohortsController');

const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

// Define routes
router.get('/', authenticateUser ,cohortsController.getAllCohorts);


module.exports = router;

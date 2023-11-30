const express = require('express');
const CodewarsController = require('../controllers/codewarsController');

const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

// Define routes
router.get('/:traineeCodewarsUsername', authenticateUser ,CodewarsController.getUserRankAndFactor);
router.get('/traineeCodewars/:traineeCodewarsUsername',authenticateUser , CodewarsController.getUserCodewarsData);

module.exports = router;

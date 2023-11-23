// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserInfo } = require('../controllers/userController');

router.get('/', getUserInfo);

module.exports = router;

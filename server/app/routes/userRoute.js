const express = require("express");
const router = express.Router();
const { getUserInfo, logout } = require('../controllers/userController'); 

router.get('/', getUserInfo);
router.get('/logout', logout);

module.exports = router;
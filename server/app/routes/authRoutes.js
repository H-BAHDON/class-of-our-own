// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');


const {
  handleGitHubCallback,
  GitHubAuthentication,
} = require('../controllers/authController');

router.get('/github', 
GitHubAuthentication
);

router.get('/github/callback', 
  passport.authenticate('github', 
    { failureRedirect: '/login' }), 
      handleGitHubCallback 
);

module.exports = router;

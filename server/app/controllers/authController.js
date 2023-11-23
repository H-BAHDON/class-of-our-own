// controllers/authController.js

const jwt = require('jsonwebtoken');
const passport = require('passport');
const { User } = require("../../models");

secretKey = "melly"
function GitHubAuthentication(req, res, next) {
    passport.authenticate('github', {
      scope: ['user:email', 'repo', 'repo:status', 'user', 'project'],
    })(req, res, next);
  }

  async function handleGitHubCallback(req, res) {
    try {
      const { id, name, email, traineeGithubAccount } = req.user.dataValues;
      const user = { id, name, email, traineeGithubAccount };
  
      const findUser = await User.findOne({ where: { email } });
      

  
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1hr' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 25 * 60 * 60 * 1000,
        secure: true,
      });
      if (findUser && (findUser.traineeCodwarsUsername !== null || findUser.traineeCodilityUsername !== null)) {
        return res.redirect(`http://localhost:3000/trainee`);
      }
      res.redirect(`http://localhost:3000/PostSignup`);
    } catch (err) {
      console.error('Error handling GitHub callback:', err);
      res.redirect('/');
    }
  }
  


module.exports = { handleGitHubCallback, GitHubAuthentication };

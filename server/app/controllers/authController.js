// controllers/authController.js

const jwt = require('jsonwebtoken');
const passport = require('passport');

secretKey = "melly"
function GitHubAuthentication(req, res, next) {
    passport.authenticate('github', {
      scope: ['user:email', 'repo', 'repo:status', 'user', 'project'],
    })(req, res, next);
  }

  function handleGitHubCallback(req, res) {
    try {
      const { id, name, email, traineeGithubAccount } = req.user.dataValues;
      const user = { id, name, email, traineeGithubAccount };
   
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1hr' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 25 * 60 * 60 * 1000,
        secure: true,
      });
      res.redirect(`http://localhost:3000/trainee?token=${token}`);
    } catch (err) {
      console.error('Error saving the token', err);
      res.redirect('/');
    }
  }
  


module.exports = { handleGitHubCallback, GitHubAuthentication };

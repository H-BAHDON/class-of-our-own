const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../../models');
require('dotenv').config();

module.exports = function () {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/auth/github/callback',
        scope: ['user:email'],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const login = profile.login || profile.id.toString(); 

          if (!login) {
            console.error('GitHub profile does not contain a login:', profile);
            return done(new Error('GitHub profile does not contain a login'), null);
          }

          const user = await User.findOne({
            where: { traineeGithubAccount: login },
          });

          if (!user) {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              role: '',
              traineeGithubAccount: login,
              accessToken,
              refreshToken,
            });
            return done(null, newUser);
          }

          return done(null, user);
        } catch (error) {
          console.error('GitHub Authentication Error:', error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id); 
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};

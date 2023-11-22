
require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

module.exports = function(passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/github/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        try {

          console.log("-------------------",profile.emails[0].value);
          return done(null, profile);
        } catch (error) {
          console.error("GitHub Authentication Error:", error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

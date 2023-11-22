require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { User } = require("./models");

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/github/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const { profileUrl } = profile;
          const user = await User.findOne({
            where: { traineeGithubAccount: profileUrl },
          });

          if (!user) {
            const user = await User.create({
              name: profile.displayName,
              email: "",
              role: "",
              traineeGithubAccount: profileUrl,
              accessToken,
              refreshToken,
            });
          }
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

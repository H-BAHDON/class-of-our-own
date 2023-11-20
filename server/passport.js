// passport.js
require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("GitHub Authentication Successful");
        // console.log("Access Token:", accessToken);
        console.log("Profile:", profile);

        // Your authentication logic here

        return done(null, profile);
      } catch (error) {
        console.error("GitHub Authentication Error:", error);
        return done(error, null);
      }
    }
  )
);

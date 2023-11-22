// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./passport");
const { sequelize, User } = require("./models");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

passwordSetup(passport);

app.get("/", (req, res) => {
  res.send("testing");
});

const secretKey = "test";

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["user:email", "repo", "repo:status", "user", "project"],
  })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    try {
      const user = req.user;
      const token = jwt.sign({ user }, secretKey, { expiresIn: "1hr" });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 25 * 60 * 60 * 1000,
        secure: true,
      });
      res.redirect(`http://localhost:3000/trainee?token=${token}`);
    } catch (err) {
      console.error("error saving the token", err);
      res.redirect("/");
    }
  }
);

app.post(
  "/signpost",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res
          .status(401)
          .json({ error: "Unauthorized - User not authenticated." });
      }

      const { codeWarsUsername, codilityUsername } = req.body;
      if (!codeWarsUsername || !codilityUsername) {
        return res.status(400).json({
          error: "Both CodeWars and Codility usernames are required.",
        });
      }

      const user = await User.findOne({ where: { email: req.user.email } });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found for the authenticated user." });
      }

      user.codeWarsUsername = codeWarsUsername;
      user.codilityUsername = codilityUsername;
      await user.save();

      return res.status(200).json({ message: "Usernames saved successfully." });
    } catch (err) {
      console.error("Error saving usernames:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
);

const port = 3001;
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Listening on port ${port}`);
});

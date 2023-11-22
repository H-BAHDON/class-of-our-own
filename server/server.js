// app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passwordSetup = require("./passport");
const { sequelize } = require("./models");

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
    scope: [
      "user:email",
      "repo",
      "repo:status",
      "user",
      "project",
    ],
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

const port = 3001;
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Listening on port ${port}`);
});

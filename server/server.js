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
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
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
      const { login } = req.user._json;
      const user = { login };
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

app.get("/user", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const { login } = decoded.user;
    const userInfo = {
      username: login,
    };
    res.json({ userInfo });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

const port = 3001;
app.listen(port, async () => {
  await sequelize.authenticate();
  console.log(`Listening on port ${port}`);
});

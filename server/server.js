const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const passport = require("passport");
const passwordSetup = require("./passport.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 25 * 60 * 60 * 100,
    sameSite: "none",
    secure: true,
  })
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("testing");
});

const secretKey = "test";

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    const user = req.user;
    // console.log(user);
    const token = jwt.sign({ user }, secretKey, { expiresIn: "1hr" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 25 * 60 * 60 * 100,
    });
    res.redirect(`/trainee?token=${token}`);
  }
);

// const db = new Pool({
//   connectionString: process.env.DB_URL,
//   ssl: { rejectUnauthorized: false },
// });

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

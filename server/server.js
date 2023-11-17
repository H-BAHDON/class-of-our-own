const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const passport = require("passport");
const passwordSetup = require("./passport.js");
// const cookieSession = require("cookie-session");
dotenv.config();

const app = express();
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("testing");
});

app.get("/auth/github", (req, res) => {
  res.json({
    message: "ok",
  });
});

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

const port = 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));

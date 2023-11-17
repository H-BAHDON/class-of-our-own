const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const passport = require("passport");
const passwordSetup = require("./passport.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("testing");
});

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

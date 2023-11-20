const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const passport = require("passport");
const passwordSetup = require("./passport.js");
const { Sequelize } = require("sequelize");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_URL);

const initializeApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.get("/", (req, res) => {
    res.send("testing");
  });

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    function (req, res) {
      res.redirect("/trainee");
    }
  );

  const db = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  const port = 3001;

  process.on("SIGINT", async () => {
    try {
      console.log("Closing the database connection...");
      await sequelize.close();
      console.log("Database connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error closing the database connection:", error);
      process.exit(1);
    }
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
};
initializeApp();

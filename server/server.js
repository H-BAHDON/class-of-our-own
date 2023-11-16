const express = require("express");
const app = express();
const port = process.env.PORT || 3008;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.listen(port, () => console.log(`Listening on port ${port}`));

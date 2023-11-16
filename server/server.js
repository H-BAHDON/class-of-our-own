const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");


app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
  res.send("testing")
})
const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

app.listen(port, () => console.log(`Listening on port ${port}`));

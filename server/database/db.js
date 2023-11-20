const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

db.query("SELECT NOW()")
  .then((res) => console.log("database connected"))
  .then((error) => console.log("failed to connect database"));

module.exports = db;

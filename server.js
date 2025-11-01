require("dotenv").config({ path: "./config.env" });
console.log("Loaded ENV:", process.env.DB_USER, process.env.DB_PASSWORD);
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Get all lost items
app.get("/api/lost", (req, res) => {
  db.query(
    "SELECT * FROM items WHERE type='lost' ORDER BY id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Get all found items
app.get("/api/found", (req, res) => {
  db.query(
    "SELECT * FROM items WHERE type='found' ORDER BY id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Add a new item (lost or found)
app.post("/api/items", (req, res) => {
  const { name, description, location, date, type, image, contact_info } =
    req.body;
  db.query(
    "INSERT INTO items (name, description, location, date, type, image, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, description, location, date, type, image, contact_info],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

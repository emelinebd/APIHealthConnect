const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const port = 5000;

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'admin',
  password: process.env.MYSQL_PASSWORD || 'oBImp4Z92nR3SDA',
  database: process.env.MYSQL_DB || 'doctor'
};

app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    console.error('Error querying the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

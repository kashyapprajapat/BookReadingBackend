const mysql = require('mysql');
require("dotenv").config();


const connection = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.PORT
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      process.exit(1);
    }
    console.log('Connected to MySQL 🗄️  SucessFully..');
  });
  

module.exports = connection;

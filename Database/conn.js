const mysql = require('mysql');
require("dotenv").config();
const path = require('path');

const connection = mysql.createConnection({
  host: 'mysql-cfa89fb-prajapatikashyap14-72ed.a.aivencloud.com',
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: 'BOOK_READING_CRUD',
  port: 14645,
  authPlugin: 'caching_sha2_password',
  ssl: {
    ca: path.resolve(__dirname, 'Backend', 'Database', 'ca.pem'), // Use path.resolve to get absolute path
    rejectUnauthorized: false
  }
});


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      process.exit(1);
    }
    console.log('Connected to MySQL 🗄️  Successfully..');
});

module.exports = connection;

const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Connected to db. ThreadID: ${connection.threadId}`);
})

module.exports = connection;
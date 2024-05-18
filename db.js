const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "34.34.217.53",
    user: "root",
    password: "",
    database: "konsultasi-dokter",
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = connection;

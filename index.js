// Import & require MySQL2
const mysql = require("mysql2");
// Import & require Inquirer
const inquirer = require("inquirer");
// Import & require Console Table
const cTable = require("console.table");

// Connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'thirtyrock_db'
    },
    console.log(`You are now connected to the thirtyrock_db database.`)
);
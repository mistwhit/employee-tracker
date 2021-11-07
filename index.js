// Imports & Requirements
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Database Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'thirtyrock_db'
    },
    console.log(`You are now connected to the thirtyrock_db database.`)
);

// Welcome & Instructions
const welcome = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'welcome',
            message: 'Welcome to the NBC Employee Management System! Please press ENTER to begin.'
        },
    ])
    .then(mainMenu);
}

// Main Menu
const main = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'main',
            message:'What would you like to do?',
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
        }
    ])
    .then((answer) => {
        switch (answer.main) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quit();
                break;
            default:
                break;
        }
    });
}

// Functions
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
    .then(main);
}

// Main Menu
const main = () => {
    inquirer.prompt([
        {
            type:'list',
            name:'main',
            message:'What would you like to do?',
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Quit"
            ]
        }
    ])
    .then((answer) => {
        switch (answer.main) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                    viewRoles();
                    break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                    addDepartment();
                    break;
            case 'Add Role':
                    addRole();
                    break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Quit':
                db.end();
                break;
            default:
                break;
        }
    });
}

// View All Departments
const viewDepartments = () => {
    db.query(`SELECT * FROM departments;`, (err, res) => {
        if (err) throw err
        console.table(res)
        main()
    })
};

// View All Roles
const viewRoles = () => {
    db.query(`SELECT * FROM roles;`, (err, res) => {
        if (err) throw err
        console.table(res)
        main()
    })
};

// View All Employees
const viewEmployees = () => {
    db.query(`SELECT * FROM employees;`, (err, res) => {
        if (err) throw err
        console.table(res)
        main()
    })
};

// Add Department
const addDepartment = () => {
    inquirer.prompt({
        type:'input',
        name:'department',
        message:'Department name:'
    })
    .then((answer) => {
        db.query(`INSERT INTO departments (name) VALUES ('${answer.department}');`, (err, res) => {
            if (err) throw err
            console.table('Department added successfully!')
            main()
        })
    })
};

// Add Role
const addRole = () => {
    db.query(`SELECT * FROM departments;`, (err, data) => {
        if (err) throw err
        // Creates array of departments
        const departmentList= data.map(departments => ({
            value: departments.id,
            name: departments.name,
        }))
        inquirer.prompt([
            {
                type:'input',
                name:'roleTitle',
                message:'Role Title:'
            },
            {
                type:'number',
                name:'roleSalary',
                message:'Role Salary:'
            },
            {
                type:'list',
                name:'roleDepartment',
                message:'Role Department:',
                choices: departmentList
            }
        ])
        .then((answer) => {
            db.query(`INSERT INTO roles (title, salary, departments_id)
            VALUES ('${answer.roleTitle}', '${answer.roleSalary}', '${answer.roleDepartment}');`, (err, res) => {
                if (err) throw err
                console.table('Role added successfully!')
                main()
            })
        })
    })
};

// Add Employee
const addEmployee = () => {
    db.query(`SELECT id, title FROM roles`, (err, data) => {
        // Creates array of roles
        const roleOptions = data.map(roles => ({
            value: roles.id,
            name: roles.title
        }))
    db.query(`SELECT id, first_name, last_name FROM employees`, (err, data) => {
        // Creates array of employees as manager options
        const mgrOptions = data.map(employees => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name
        }))
        // Adds the option to select "No Manager" if employee does not have a manager
        mgrOptions.push({
            name: "No Manager",
            value: null
        })
    inquirer.prompt([
        {
            type:'input',
            name: 'firstName',
            message: 'Employee First Name:'
        },
        {
            type:'input',
            name: 'lastName',
            message: 'Employee Last Name:'
        },
        {
            type:'list',
            name: 'role',
            message: 'Employee Role:',
            choices: roleOptions
        },
        {
            type:'list',
            name: 'manager',
            message: 'Employee Manager:',
            choices: mgrOptions
        }
    ])
    .then((answer) => {
        console.log(answer);
        db.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.role}, ${answer.manager});`, (err, res) => {
            if (err) throw err
            console.log('Employee Added Successfully!')
            main()
        })
    })
    })
    })
};

// Update Employee Role
const updateRole = () => {
    db.query(`SELECT id, title FROM roles;`, (err, data) => {
        if (err) throw err
        // Creates array of roles
        const roleList = data.map(roles => ({
            value: roles.id,
            name: roles.title
        }))
    db.query(`SELECT id, first_name, last_name FROM employees;`, (err, data) => {
        // Creates array of employee first & last names
        const employeeList = data.map(employees => ({
            value: employees.id,
            name: employees.first_name + " " + employees.last_name,
        }))
    inquirer.prompt([
        {
            type:'list',
            name:'employees',
            message:'Choose Employee:',
            choices: employeeList
        },
        {
            type:'list',
            name:'roles',
            message:'Choose New Role:',
            choices: roleList
        }
    ])
    .then((answer) => {
        db.query(`UPDATE employees SET roles_id = ${answer.roles} WHERE id = ${answer.employees};`, (err, res) => {
            if (err) throw err
            console.log('Employee Updated Successfully!')
            main()
        })
    })
    })
    }) 
};

// Start
db.connect((err) => {
    if (err) throw err
    welcome()
});
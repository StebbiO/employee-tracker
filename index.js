const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./config/connection');

const openPrompt = () => {
    inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'Please select one of the following options:',
            loop: false,
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ]
        }    
    ]).then(response => {
        switch (response.options) {
            case 'View All Departments':
                viewDept();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmp();
                break;
            case 'Add a Department':
                addDept();
                break;
            case 'Add a Role':
                addRole()
                break;
            case 'Add an Employee':
                addEmp();
                break;
            case 'Update an Employee Role':
                updateEmpRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
};

const viewDept = () => {
    let sql = `SELECT department_name AS "Department" FROM department`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table('Departments', result);
        openPrompt();
    })
};

const viewRoles = () => {
    let sql = `SELECT title as "Role" FROM roles`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table('Roles', result);
        openPrompt();
    })
};

const viewEmp = () => {
    let sql = `SELECT employee.id,
               employee.first_name,
               employee.last_name,
               role.title,
               department.department_name AS "Department",
               role.salary
               FROM employee, role, department
               WHERE department.id = role.department_id
               AND role.id = employee.role_id`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table('Employees', result);
        openPrompt();
    })
};

const addDept = () => {
    let newD = [
        {
            type: 'input',
            name: 'dept',
            message: 'Please enter the name of the new department'
        }
    ];

    inquirer.prompt(newD)
    .then(response => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        connection.query(sql, [response.dept], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${response.dept} department`);
            openPrompt();
        });
    })
    .catch(err => {
        console.log(err);
    })
};

const addRole = () => {
    const departments = [];
    const sql1 = 'SELECT * FROM DEPARTMENT';
    connection.query(sql1, (err, res) => {
        if (err) throw err;
    })
}

const addEmp = () => {

}

const updateEmpRole = () => {

}

openPrompt();
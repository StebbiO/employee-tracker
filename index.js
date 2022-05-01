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
    })
};

const viewRoles = () => {
    let sql = `SELECT title as "Role" FROM roles`
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table('Roles', result)
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
    })
};

openPrompt();
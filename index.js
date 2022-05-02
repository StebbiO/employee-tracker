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
    let sql = `SELECT department.id, 
               department_name AS "Department" FROM department`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.table('Departments', result);
        openPrompt();
    })
};

const viewRoles = () => {
    let sql = `SELECT roles.id, 
               roles.title,
               roles.salary,
               department.department_name AS department
               FROM roles
               INNER JOIN department ON roles.department_id = department.id`;
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
               roles.title,
               department.department_name AS "Department",
               roles.salary
               FROM employee, roles, department
               WHERE department.id = roles.department_id
               AND roles.id = employee.role_id`;
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
    const departmentArr = [];
    const sql1 = 'SELECT * FROM department';
    connection.query(sql1, (err, res) => {
        if (err) throw err;

        res.forEach(dept => {
            let deptObj = {
                name: dept.name,
                id: dept.id
            }
            departmentArr.push(deptObj);
        });

        let questions = [
            {
                type: 'input',
                name: 'title',
                message: 'Please enter the title of the new role.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary of the new role.'
            },
            {
                type: 'list',
                name: 'department',
                choices: departmentArr,
                message: 'Please select the department this role belongs to.'
            }
        ];

        inquirer.prompt(questions)
        .then(response => {
            const sql2 = 'INSERT INTO roles (title, salary, department_id) VALUES (?)';
            connection.query(sql2, [[response.title, response.salary, response.department]], (err, res) => {
                if (err) throw err;
                console.log(`Successfully added ${response.title} role!`);
                openPrompt();
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
};

const addEmp = () => {

}

const updateEmpRole = () => {

}

openPrompt();
const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_db",
});


const startApp = [
  {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Employees By Department",
      "View All Employees By Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
    ],
  },
];

const viewAllEmployees = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      employeeTracker();
    }
  );
};

//! Review this to better understand it 
let departmentNames;
let departmentIds;
var arrayOfDepartments = {};

connection.query("SELECT * FROM department", (err, res) => {
  if (err) throw err;

  departmentNames = res.map((x) => x.department);
  departmentIds = res.map((x) => x.id);
  for (var i = 0; i < departmentNames.length; i++) {
    arrayOfDepartments[departmentNames[i]] = departmentIds[i];
  }
});
//!------------------------------------------

//! Review this to better understand it 
let roleNames;
let roleIds;
var arrayOfRoles = {};

connection.query("SELECT * FROM role", (err, res) => {
  if (err) throw err;

  roleNames = res.map((x) => x.title);
  roleIds = res.map((x) => x.id);
  for (var i = 0; i < roleNames.length; i++) {
    arrayOfRoles[roleNames[i]] = roleIds[i];
  }
  // console.log(roleNames, roleIds, arrayOfRoles)
});

//!------------------------------------------

const viewAllEmployeesByDepartment = () => {

  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to view?",
      choices: departmentNames
    })
    .then(function (answer) {
      // storeAllDepartments()

      // console.log(answer.department)
      const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.department = ?;`;
      connection.query(query, answer.department, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTracker();
      });
    });
};

const viewAllEmployeesByManager = [{}];


let roleId;
let nextRoleId;
connection.query("SELECT * FROM role", (err, res) => {
  if (err) throw err;
  roleId = res.map((x) => x.id);
  // console.log(roleId)

  nextRoleId = roleId.length + 1

});


const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "list",
        message: "Which department does this employee belong too?",
        choices: departmentNames
      },
      {
        name: "title",
        type: "list",
        message: "What is the employee's title?",
        choices: roleNames
      },
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
    ])
    .then(({ department, title, salary, firstName, lastName }) => {
      // console.log(typeof department)
      // console.log(departmentId)
      // console.log(typeof title, title)
      // console.log(typeof salary, salary)
      // console.log(firstName)
      // console.log(lastName)
      // console.log(nextRoleId)

      let departmentData;
      let departmentId = arrayOfDepartments[department];
      let roleId = arrayOfRoles[title]
      // console.log(typeof departmentId, departmentId, "departmentId")
     
      // console.log(arrayOfDepartments, department)

      
      // const query1 = `INSERT INTO role(title, salary, department_id) VALUES ?`
      const query2 = `INSERT INTO employee (first_name, last_name, role_id) VALUES ?`
  
      // connection.query(query1, [[[salary, departmentId]]], (err,res) => {
      //   if (err) throw err
      // })
      connection.query(query2, [[[firstName, lastName, roleId]]], (err,res) => {
        if (err) throw err
        viewAllEmployees()
      })
    })
};

const removeEmployee = [{}];

const updateEmployeeRole = [{}];

const updateEmployeeManager = [{}];

const employeeTracker = () => {
  inquirer.prompt(startApp).then((answer) => {
    // console.log(answer)
    switch (answer.action) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Employees By Department":
        viewAllEmployeesByDepartment();
        break;
      case "View All Employees By Manager":
        // console.log("View All Employees By Manager")
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Remove Employee":
        // console.log("Remove Employee")
        break;
      case "Update Employee Role":
        // console.log("Update Employee Role")
        break;
      case "Update Employee Manager":
        // console.log("Update Employee Manager")
        break;
    }
  });
};

employeeTracker();

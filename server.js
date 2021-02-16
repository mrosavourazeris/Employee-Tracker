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
var arrayOfObject = {};

connection.query("SELECT * FROM department", (err, res) => {
  if (err) throw err;

  departmentNames = res.map((x) => x.department);
  departmentIds = res.map((x) => x.id);
  for (var i = 0; i < departmentNames.length; i++) {
    arrayOfObject[departmentNames[i]] = departmentIds[i];
  }
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

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "list",
        message: "Which department does this employee belong too?",
        choices: departmentNames
      },
      // {
      //   name: "departmentId",
      //   type: "input",
      //   message: "What is the department id?"
      // },
      {
        name: "title",
        type: "input",
        message: "What is the employee's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?",
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
      {
        name: "roleId",
        type: "input",
        message: "What is the employee's role id?",
      },
    ])
    .then(({ department, title, salary, firstName, lastName, roleId }) => {
      // console.log(typeof department)
      // console.log(departmentId)
      // console.log(title)
      // console.log(salary)
      // console.log(firstName)
      // console.log(lastName)
      // console.log(roleId)

      let departmentData;
      let departmentId = arrayOfObject[department];

     
      // console.log(departmentData,departmentId)

      // const query1 = `INSERT INTO department(department) VALUES ?;`
      // const query2 = `INSERT INTO role(title, salary, department_id) VALUES ?;`
      // const query3 = `INSERT INTO employee (first_name, last_name, role_id) VALUES ?;`
      // connection.query(query1, department, (err,res) => {
      //   if (err) throw err
      //   console.table(res)
      // connection.query(query2, ({title, salary, departmentId}), (err,res) => {
      //   if (err) throw err
      //   connection.query(query3, ({firstName, lastName, roleId}), (err,res) => {
      //     if (err) throw err
      //     console.table(res)
      //     employeeTracker()
      //   })
      // })
      // })
    });
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

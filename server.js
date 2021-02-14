const mysql = require("mysql")
const inquirer = require("inquirer")
// const cTable = require("console.table")

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'employees_db'
});


const startApp = [
  {
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      'View All Employees', 
      'View All Employees By Department', 
      'View All Employees By Manager',
      'Add Employee',
      'Remove Employee',
      'Update Employee Role',
      'Update Employee Manager'
    ]
  }
]



const viewAllEmployees = () => {
  connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;`, (err,res) => {
    if (err) throw err
    console.table(res)
    employeeTracker()
  })
}

const viewAllEmployeesByDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Which department would you like to view?"
    })
    .then(function(answer) {
      console.log(answer.department)
      const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.department = ?;`
      connection.query(query, answer.department, (err,res) => {
        if (err) throw err
        console.table(res)
        employeeTracker()
      })
    })
}

const viewAllEmployeesByManager = [
  {
    
  }
]

const addEmployee = [
  {
    
  }
]

const removeEmployee = [
  {
    
  }
]

const updateEmployeeRole = [
  {
    
  }
]

const updateEmployeeManager = [
  {
    
  }
]

const employeeTracker = () => {
  inquirer.prompt(startApp)
  .then(answer => {
    // console.log(answer)
    switch(answer.action) {
      case "View All Employees":
        viewAllEmployees()
        break;
      case "View All Employees By Department":
        viewAllEmployeesByDepartment()
        break;
      case "View All Employees By Manager":
        // console.log("View All Employees By Manager")
        break;
      case "Add Employee":
        // console.log("Add Employee")
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
  })
}



employeeTracker()
const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")

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
  connection.query()
}

const viewAllEmployeesByDepartment = [
  {
    
  }
]

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
        // console.log("View All Employees")
        break;
      case "View All Employees By Department":
        // console.log("View All Employees By Department")
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
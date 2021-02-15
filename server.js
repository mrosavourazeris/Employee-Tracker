const mysql = require("mysql")
const inquirer = require("inquirer")
// const cTable = require("console.table")

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'employees_db'
});


//? is there a way to list all the departments from mysql in this array that way we can use 
var allDepartments;
const storeAllDepartments = () => {
  connection.query(`SELECT department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id`, (err,data) => {
    if (err) throw err
    console.log(data)
    allDepartments = data
  })
  console.log("this is the let allDepartments" + allDepartments)
}
//--------------------------------------------------------------

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

//? department needs to be dynamic, should hold an array containing departments from the mysql database, that way when a new department is added by the user it shows up in this array
const viewAllEmployeesByDepartment = () => {
  inquirer
    .prompt(
      {
      name: "department",
      type: "list",
      message: "Which department would you like to view?",
      choices: ["Engineering","Finance","Legal","Sales"]
      }
    )
    .then(function(answer) {
      // storeAllDepartments()

      // console.log(answer.department)
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

const addEmployee = () => {
  inquirer
    .prompt(
      [
        {
          name: "department",
          type: "list",
          message: "Which department does this employee belong too?",
          choices: ["Engineering","Finance","Legal","Sales"]
        },
        // {
        //   name: "departmentId",
        //   type: "input",
        //   message: "What is the department id?"
        // },
        {
          name: "title",
          type: "input",
          message: "What is the employee's title?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the employee's salary?"
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?"
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
          name: "roleId",
          type: "input",
          message: "What is the employee's role id?"
        }
      ]
    ).then(({department, title, salary, firstName, lastName, roleId}) => {
      // console.log(typeof department)
      // console.log(departmentId)
      // console.log(title)
      // console.log(salary)
      // console.log(firstName)
      // console.log(lastName)
      // console.log(roleId)

      let departmentData;
      let departmentId;
      const departmentIdOptions =[1,2,3,4]
      console.log(departmentIdOptions[0])
      switch(department){
        case "Engineering":
          departmentData = "Engineering"
          departmentId = departmentIdOptions[0]
          break;
        case "Finance":
          departmentData = "Engineering"
          departmentId = departmentIdOptions[0]
          break;
        case "Legal":
          departmentData = "Engineering"
          departmentId = departmentIdOptions[0]
          break;
        case "Sales":
          departmentData = "Engineering"
          departmentId = departmentIdOptions[0]
          break;
          
      }
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
    })
}

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
        addEmployee()
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
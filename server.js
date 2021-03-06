const connection = require("./config/connection");
const inquirer = require("inquirer");
let departmentNames;
let departmentIds;
let arrayOfDepartments = {};
let roleNames;
let roleIds;
let arrayOfRoles = {};
let employeeFullNames;
let employeeIds;
let arrayOfEmployees = {};

let startUpQuery = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    
    departmentNames = res.map((x) => x.department);
    departmentIds = res.map((x) => x.id);
    for (var i = 0; i < departmentNames.length; i++) {
      arrayOfDepartments[departmentNames[i]] = departmentIds[i];
    }
  });
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
  
    roleNames = res.map((x) => x.title);
    roleIds = res.map((x) => x.id);
    for (var i = 0; i < roleNames.length; i++) {
      arrayOfRoles[roleNames[i]] = roleIds[i];
    }
    // console.log(roleNames, roleIds, arrayOfRoles)
  });
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
  
    employeeFullNames = res.map((x) => (x.first_name + " " + x.last_name));
    employeeIds = res.map((x) => x.id);
    for (var i = 0; i < employeeFullNames.length; i++) {
      arrayOfEmployees[employeeFullNames[i]] = employeeIds[i];
    }
    // console.log(roleNames, roleIds, arrayOfRoles)
  });
}

const viewAllEmployeesByDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to view?",
      choices: departmentNames,
    })
    .then(function (answer) {
      // storeAllDepartments()

      // console.log(answer.department)
      connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.department = ?;`, answer.department, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTracker();
      });
    });
};

const viewAllEmployeesByRole = () => {
  inquirer
    .prompt({
      name: "role",
      type: "list",
      message: "What employee roles would you like to view?",
      choices: roleNames,
    })
    .then(function (answer) {
      // console.log(answer)
      connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = ?;`, answer.role, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTracker();
      });
    });
};

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

const addDepartment = () => {
  inquirer
  .prompt(
    {
      name: "newDepartment",
      type: "input",
      message: "What department would you like to add?"
    },
  ).then((answer) => {
    // console.log(answer.department)
    connection.query(`INSERT INTO department (department) VALUES (?)`, answer.newDepartment, (err,res) => {
      if (err) throw err
      employeeTracker()
    })
  })
};

const addRole = () => {
  inquirer
  .prompt([
    {
      name: "department",
      type: "list",
      message: "Which department is this role part of?",
      choices: departmentNames
    },
    {
      name: "newRole",
      type: "input",
      message: "What is the role you would like to add?"
    },
    {
      name: "salary",
      type: "number",
      message: "What is the yearly salary for this role?"
    }
  ]).then(({department, newRole, salary}) => {
    let departmentIds = arrayOfDepartments[department]
    connection.query(`INSERT INTO role(title, salary, department_id) VALUES ?`, [[[newRole,salary,departmentIds]]], (err,res) => {
      if (err) throw err
      employeeTracker()
    })
  })

}

const addEmployee = () => {
  inquirer
    .prompt([
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
    .then(({title, firstName, lastName }) => {
      let roleId = arrayOfRoles[title]
  
      connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ?`, [[[firstName, lastName, roleId]]], (err,res) => {
        if (err) throw err
        employeeTracker()
      })
    })
};

const updateEmployeeRole = () => {
  inquirer
  .prompt(
    [
      {
        name: "employeeName",
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: employeeFullNames
      },
      {
        name: "updateRole",
        type: "list",
        message: "What is the employee's new role?",
        choices: roleNames
      }
    ]
  ).then(({employeeName, updateRole}) => {
    let newRoleId = arrayOfRoles[updateRole]
    let newEmployeeId = (arrayOfEmployees[employeeName])

    connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [[newRoleId], [newEmployeeId]], (err, res) => {
      if (err) throw err
      employeeTracker()
    })
  })
}

const employeeTracker = () => {
  startUpQuery()
  inquirer
  .prompt(
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        //Complete
        "View All Employees By Department",
        //Complete
        "View All Employees By Role",
        //TODO: Bonus
        // "View All Employees By Manager",
        //Complete
        "View All Employees",
        //Complete
        "Add Department",
        //Complete
        "Add Role",
        //Complete
        "Add Employee",
        //TODO: Bonus
        // "Remove Department",
        //TODO: Bonus
        // "Remove Role",
        //TODO: Bonus
        // "Remove Employee",
        //Complete
        "Update Employee Role",
        //TODO: Bonus
        // "Update Employee Manager",
        // "End App"
      ],
    },
  ).then((answer) => {
    // console.log(answer)
    switch (answer.action) {
      case "View All Employees By Department":
        viewAllEmployeesByDepartment();
        break;
      case "View All Employees By Role":
        viewAllEmployeesByRole()
        break;
      // case "View All Employees By Manager":
      //   viewAllEmployeesByManager()
      //   break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add Department":
        addDepartment()
        break;
      case "Add Role":
        addRole()
        break;
      case "Add Employee":
        addEmployee();
        break;
      // case "Remove Department":
      //   removeDepartment()
      //   break;
      // case "Remove Role":
      //   removeRole()
      //   break;
      // case "Remove Employee":
      //   removeEmployee()
      //   break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      // case "Update Employee Manager":
      //   updateManager()
      //   break;
      // case "End App":
      //   return "^C"
        
    }
  });
};

employeeTracker();

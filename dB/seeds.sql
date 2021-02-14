INSERT INTO department(department) VALUES ("Sales");
INSERT INTO department (department) VALUES ("Engineering");
INSERT INTO department(department) VALUES ("Finance");
INSERT INTO department (department) VALUES ("Legal");


INSERT INTO role(title, salary, department_id) VALUES ("Legal Lead", 40000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Finance Lead", 40000, 3);
INSERT INTO role(title, salary, department_id) VALUES ("Engineering Lead", 40000, 2);
INSERT INTO role(title, salary, department_id) VALUES ("Sales Lead", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Sara", "Wilson",1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Zac", "Jayes",2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jenry", "Valdes",3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Michael", "Rosa",4);

//Shows all employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary 
FROM employee 
INNER JOIN role
ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;

//Shows all employees 
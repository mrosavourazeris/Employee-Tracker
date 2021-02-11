DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department_table (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role_table (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department_table(id)
    
);

CREATE TABLE manager_table (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee_table (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role_table (id),
    FOREIGN KEY (manager_id) REFERENCES manager_table (id)
);




SELECT * FROM employee_table;


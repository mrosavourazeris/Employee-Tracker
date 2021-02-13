DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department_table (
	id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role_table (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department_table(id)
    
);

-- -- CREATE TABLE manager_table (
-- -- 	id INT NOT NULL AUTO_INCREMENT,
-- --     first_name VARCHAR (30) NOT NULL,
-- --     last_name VARCHAR (30) NOT NULL,
-- --     PRIMARY KEY(id)
-- -- );

CREATE TABLE employee_table (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    -- m_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role_table(id)
    -- FOREIGN KEY (m_id) REFERENCES m_table(id)
);




INSERT INTO department_table (department) VALUES ("Sales");
INSERT INTO role_table (title, salary, department_id) VALUES ("Sales Manager", 40000, 1);
INSERT INTO employee_table (first_name, last_name, role_id) VALUES ("Michael", "Rosa",1);

-- SELECT * FROM role_table;


SELECT * FROM employee_table e INNER JOIN role_table r ON e.role_id = r.id INNER JOIN department_table d ON 


-- SELECT e_table.e_id, e_table.first_name, e_table.last_name, r_table.title, d_table.department, r_table.salary
-- FROM e_table, r_table, d_table
-- WHERE e_table.r_id = r_table.r_id AND e_table.d_id = d_table.d_id;







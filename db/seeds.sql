INSERT INTO department(department_name)
VALUES
('Management'),
('Producer'),
('Host'),
('Sales'),
('Engineer');

INSERT INTO roles(title, salary, department_id)
VALUES
('Morning Producer', 55000, 2),
('Salesperson', 40000, 4),
('Morning Host', 75000, 3),
('Audio Engineer', 38000, 5),
('Production manager', 80000, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Craig', 'Miller', 3, 5),
('Mike', 'Fernandez', 1, 5),
('T.C.', 'Fleming', 4, 5),
('Chris', 'Chris', 2, null),
('Dan', 'Bennett', 1, null);
INSERT INTO department (name)
VALUES ("Writing"),
    ("Acting"),
    ("Executive"),

INSERT INTO roles (title, salary, department_id)
VALUES ("Head Writer", 150000, 1),
    ("Actor/Actress", 300000, 2),
    ("CEO", 400000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Liz", "Lemon", 1, NULL),
    ("Jack", "Donaghy", 3, 1)
    ("Tracy", "Jordan", 2, NULL),
    ("Jenna", "Maroney", 2, NULL);
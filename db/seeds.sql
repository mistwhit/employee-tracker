INSERT INTO departments (name)
VALUES ("Writing"),
    ("Acting"),
    ("Executive"),
    ("Paging");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Head Writer", 150000, 1),
    ("Actor/Actress", 300000, 2),
    ("Page", 50000, 4)
    ("CEO", 400000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Liz", "Lemon", 1, 4),
    ("Tracy", "Jordan", 2, 1),
    ("Jenna", "Maroney", 2, 1),
    ("Jack", "Donaghy", 3, NULL);
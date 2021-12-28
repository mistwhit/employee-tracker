INSERT INTO departments (name)
VALUES ("Writing"),
    ("Acting"),
    ("Executive"),
    ("Paging");

INSERT INTO roles (title, salary, departments_id)
VALUES ("Head Writer", 150000, 1),
    ("Actor/Actress", 300000, 2),
    ("Page", 50000, 4),
    ("CEO", 400000, 3);

INSERT INTO employees (first_name, last_name, roles_id)
VALUES ("Liz", "Lemon", 1),
    ("Tracy", "Jordan", 2),
    ("Jenna", "Maroney", 2),
    ("Jack", "Donaghy", 3);
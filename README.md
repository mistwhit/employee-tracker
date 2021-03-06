# MySQL Employee Tracker

## Description
This project is a command-line employee management system that allows a user to manage the departments, roles, and employees in their company.

## Demonstration
[Video Demonstration](https://vimeo.com/660792071)

## Installation
Start by cloning this repository in your own code editor, then input the following pormpts to dowload your package.json, dowload inquirer, dowload console.table, source your database, and start the program in the command line.

```
npm init -y
```
```
npm install
```
```
npm install inquirer
```
```
npm install console.table
```
```
mysql -u root -p
(Enter your password here!)
source db/schema.sql;
source db/seeds.sql;
exit
```
```
npm start
```

## Technologies Used
- MySQL
- Inquirer
- Console.Table

## License
This project is licensed under the MIT license.
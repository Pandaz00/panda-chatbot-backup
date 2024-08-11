/*const sql = require("mysql");
const dotenv = require("dotenv").config();
const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

module.exports = db;

// just try with tutroial

//This file is using to connect with the database
// not crated the database yet
//date:Apr-23-2024

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'student',
    database: 'login_data'
});

connection.connect(function (e) {
    if (e) {
        return console.error('error' + e.message);
    }
    console.log('Successfully connected to the mysql server...\n');
});

let $query = 'SELECT * from  users'// the model that we will create then,about users info ex:username,password,e-mailaddress
connection.query($query, function (e, rows) {
    if (e) {
        console.log("Error ocurred in excuting the query");
        return;
    }
});

// get and post with user info and reponse with login page
module.exports = connection;


/**  close the database connection
connection.end(function () {
    console.log('\nConnection closed.\n');
});*/

// start here , following with professor's insturctions

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const authRoures = require('./routes/users');
require('dotenv').config();


const userRoutes = require('./routes/users');
const app = express();
// Body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Static files 
app.use(express.static('public'));

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
});
app.set('pool', pool); //connection pool handle with concurrency?

// Routes
app.use('/users', userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userrouter = require('./routes/user.js');
const connection = require('./connection.js');
const PORT = 8000;

// connnection to mongodb
connection();

// schema for user



// routes 
app.use(express.json());

// routes for user
app.use('/users',userrouter)

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
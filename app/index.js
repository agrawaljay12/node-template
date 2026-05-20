const express = require('express');
const app = express();
const connection = require('../config/connection.js');
const router = require("../routes/index.js")

// connnection to mongodb
connection();

//middleware 
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan("dev"))

// register routes of application
router(app);

module.exports = app;
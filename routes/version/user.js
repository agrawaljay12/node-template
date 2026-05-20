const express = require('express');
const router = express.Router();
const User = require('../../models/index.js');
const {handleGetAllUsers ,handleDeleteUserById ,handleCreateUser ,handleUpdateUserById ,handleGetUserById} = require ('../../controller/user.js');

// get all users

router.get('/', handleGetAllUsers);

// delete user by id 

router.delete('/:id',handleDeleteUserById);


//append user to the file
router.post('/append', handleCreateUser);

// update user by id 
router.put('/:id',handleUpdateUserById);

// get particular user by id
router.get('/:id',handleGetUserById);

module.exports = router;
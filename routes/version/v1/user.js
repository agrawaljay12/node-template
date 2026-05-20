import express from 'express';
const router = express.Router();
import  User from '../../../models/index.js';
import {handleGetAllUsers ,handleDeleteUserById ,handleCreateUser ,handleUpdateUserById ,handleGetUserById} from '../../../controller/user.js';

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
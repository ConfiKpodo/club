const express = require('express');  
const router = express.Router(); 
const userController = require('../controller/user.controller'); 
// Routes for users  
router.post('/createUser', userController.createUser); // Create a new user  
router.get('/getAllUser', userController.getAllUsers); // Get all users  
router.get('/:id', userController.getUserById); // Get a user by ID  
router.put('/:id', userController.updateUser); // Update a user by ID  
router.delete('/:id', userController.deleteUser); // Delete a user by ID  
router.post('/:email', userController.loginUser);
router.post('/:authenticated', userController.authenticatedUsers)
router.post('/:email', userController.moderators)
module.exports = router;
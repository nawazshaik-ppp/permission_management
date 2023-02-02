const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService');
 
router.post('/signup', userController.signup);
router.post('/signupRole', userController.signUpRole);

 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedin, userService.getUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userService.getUsers);
router.get('/usersRole', userController.allowIfLoggedin, userController.grantAccessRolePerm('readAny', 'profile'), userService.getUsersRole);
 
router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userService.updateUser);
router.put('/userRole/:userId', userController.allowIfLoggedin, userController.grantAccessRolePerm('updateAny', 'profile'), userService.updateUserRole);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userService.deleteUser);
 
module.exports = router;
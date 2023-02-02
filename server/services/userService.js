const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }
    
   exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
   exports.getUsersRole = async (req, res, next) => {
    const users = await UserRole.find({});
    res.status(200).json({
     data: users
    });
   }
    
   exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     console.log(update);
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
   exports.updateUserRole = async (req, res, next) => {
    try {
     const update = req.body
     console.log(update);
     const userId = req.params.userId;
     await UserRole.findByIdAndUpdate(userId, update);
     const user = await UserRole.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }
    
   exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }
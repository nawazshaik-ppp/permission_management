const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');
const Role = require('../models/roleModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = "jwt-secret";

async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

const { roles } = require('../roles')
 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}

exports.grantAccessRolePerm = function(action, resource) {
    return async (req, res, next) => {
     try {
      console.log(req.user);
      const permissions = req.user.role.permissions;
      let granted = false;
      permissions.forEach((permission)=>{
        if(permission == action)
        {
            granted = true;
        }
      })
      if (!granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
   }
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  console.log(user);
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}

exports.signup = async (req, res, next) => {
 try {
  const { email, password, role } = req.body
  console.log(req.body)
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
  const accessToken = jwt.sign({ userId: newUser._id }, (process.env.JWT_SECRET||JWT_SECRET), {
   expiresIn: "1d"
  });
  newUser.accessToken = accessToken;
  await newUser.save();
  res.json({
   data: newUser,
   accessToken
  })
 } catch (error) {
  next(error)
 }
}

// role based
exports.signUpRole = async (req, res, next) => {
    try {
     const { email, password, role, permissions } = req.body
     console.log(req.body)
     const hashedPassword = await hashPassword(password);
    

     const newRole  = new Role({role: role, permissions: permissions});
     const newUser = new UserRole({ email, password: hashedPassword, role: newRole});
     const accessToken = jwt.sign({ userId: newUser._id }, (process.env.JWT_SECRET||JWT_SECRET), {
      expiresIn: "1d"
     });
     rolePerm = {
        role: role,
        permissions: permissions
     }
     newUser.accessToken = accessToken;
     await newUser.save();
     res.json({
      data: newUser,
      accessToken
     })
    } catch (error) {
     next(error)
    }
   }

exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(new Error('Email does not exist'));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(new Error('Password is not correct'))
     const accessToken = jwt.sign({ userId: user._id }, (process.env.JWT_SECRET||JWT_SECRET), {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken
     })
    } catch (error) {
     next(error);
    }
   }
const express = require('express')
const {userSignup,loginUser,verifyUser,allUser, isLogout}  = require('../Controller/userAuthentication');
const { isLogin } = require('../Middleware/authMiddleware');
const authenticationRoute =  express.Router();

  
  authenticationRoute.post('/userRegister',userSignup)
  authenticationRoute.post('/userlogin',loginUser)
  authenticationRoute.get('/me',verifyUser)
  authenticationRoute.get('/allUser',isLogin,allUser)
  authenticationRoute.get('/isLogout',isLogout)
  
module.exports = authenticationRoute;
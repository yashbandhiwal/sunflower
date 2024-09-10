const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/users');
const { validationResult } = require('express-validator');

/**
 * 
 * @title : Create user
 * @params : name.email,phone_number,password
 * @route : POST /api/v1/user/
 * @access : public 
 * @description :   - create user
 *                  - send verify email code
 *                  - send verify phone number code
 * 
 */
exports.create = asyncHandler(async(req,res,next) => {

    const {
        name,
        email,
        phone_number,
        password
    } = req.body;

    const result = validationResult(req);
    if (result.isEmpty()) {
    }else{
        return res.send({ errors: result.array() });
    }

    const user = await User.create({
        name,
        email,
        phone_number,
        password
    })

    sendTokenResponse(user, 200, res);
    
})


/**
 * 
 * @title :login
 * @params : 
 * @route : GET /api/v1/user/login
 * @access : Public
 * @description : login and setting the session
 * 
 */
exports.login = asyncHandler(async(req,res,next) => {
  
  const {
    email,
    password
  } = req.body;

  let userEmailExist = await User.findOne({email:email}).select('+password');
  if(!userEmailExist){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  let isMatch = await userEmailExist.matchPassword(password);
  if(!isMatch){
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  req.session.isLoggedIn = true;
  req.session.user = userEmailExist._id;
  let err = await req.session.save()
  console.log(err);
  console.log(req.session);

  res.status(200).json({
    success:true,
    data: userEmailExist,
  })

})

/**
 * 
 * @title : Update user
 * @params : name, email, phone_number,
 * @route : PUT /api/v1/user/
 * @access : Private
 * @description :   - update email
 *                  - update phone
 *                  - update both
 *                  - verification off and code resend
 * 
 */
exports.update = asyncHandler(async(req,res,next) => {
  
  console.log(req.session);

  res.status(200).json({
    success:true
  })

})


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  };
  
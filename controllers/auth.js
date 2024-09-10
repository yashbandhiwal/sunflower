const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/users');
const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

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
  
  let {
    email,
    phone_number,
    name,
    id
  } = req.body

  let emailExist = await User.findOne({
    email:email
  })
  if(emailExist){
    return next(new ErrorResponse('Email already exists', 401));
  }

  let phoneExist = await User.findOne({
    phone_number:phone_number
  })
  if(phoneExist){
    return next(new ErrorResponse('Phone already exists', 401));
  }

  let updateObj = {}

  if(email){
    updateObj = {
      ...updateObj,
      email:email,
      verified_email:false
    }
  }
  if(phone_number){
    updateObj = {
      ...updateObj,
      phone_number,
      verified_phone_number:false
    }
  }
  if(name){
    updateObj = {
      ...updateObj,
      name
    }
  }
  

  let userExist = await User.findById(id);
  if(!userExist){
    return next(new ErrorResponse('User not found', 404));
  }

  let userUpdate = await User.findByIdAndUpdate({
      _id:new ObjectId(id)
    },
    {
      $set:updateObj
    },
    {
      returnDocument:"after"
    }
  )

  res.status(200).json({
    success:true,
    data:userUpdate
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
  
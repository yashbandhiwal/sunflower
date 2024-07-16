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
  
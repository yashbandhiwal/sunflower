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

/**
 * 
 * @title : Verify email of user code send
 * @params : email id
 * @route : GET /api/v1/user/emailverificationcode
 * @access : Private
 * @description : send the email verification code just a button that send this
 * 
 */

/**
 * 
 * @title : Verify phone of user code send
 * @params : phone_number
 * @route : GET /api/v1/user/phoneverificationcode
 * @access : Private
 * @description : send the phone verification code just a click and send this
 * 
 */

/**
 * 
 * @title : User password reset
 * @params : id, old password, new password
 * @route : POST /api/v1/user/resetpassword
 * @access : Private
 * @description : reset the password
 * 
 */

/**
 * 
 * @title :Forgotten password
 * @params : email
 * @route : PUT /api/v1/user/forgottenpassword
 * @access : Public
 * @description : send resetpassword link
 * 
 */

/**
 * 
 * @title :Resetlinkpassword
 * @params : 
 * @route : GET /api/v1/user/resetforgottenpassword/:resettoken
 * @access : Public
 * @description : resettoken validation then enter new password
 * 
 */
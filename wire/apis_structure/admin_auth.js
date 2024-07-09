/**
 * 
 * @title : Create admin
 * @params : name.email,phone_number,password
 * @route : POST /api/v1/admin/create
 * @access : public 
 * @description :   - create admin
 *                  - send verify email code
 *                  - send verify phone number code
 * 
 */

/**
 * 
 * @title : Update admin
 * @params : name, email, phone_number,
 * @route : PUT /api/v1/admin/update
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
 * @route : GET /api/v1/admin/emailverificationcode
 * @access : Private
 * @description : send the email verification code just a button that send this
 * 
 */

/**
 * 
 * @title : Verify phone of user code send
 * @params : phone_number
 * @route : GET /api/v1/admin/phoneverificationcode
 * @access : Private
 * @description : send the phone verification code just a click and send this
 * 
 */

/**
 * 
 * @title : Admin password reset
 * @params : id, old password, new password
 * @route : POST /api/v1/admin/resetpassword
 * @access : Private
 * @description : reset the password
 * 
 */

/**
 * 
 * @title :Forgotten password
 * @params : email
 * @route : PUT /api/v1/admin/forgottenpassword
 * @access : Public
 * @description : send resetpassword link
 * 
 */

/**
 * 
 * @title :Resetlinkpassword
 * @params : 
 * @route : GET /api/v1/admin/resetforgottenpassword/:resettoken
 * @access : Public
 * @description : resettoken validation then enter new password
 * 
 */
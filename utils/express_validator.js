const {body}  = require('express-validator');

export const createValidator = {
    body('name','username does not Empty').not().isEmpty(),
}
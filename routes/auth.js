const express = require('express');
const { body } = require('express-validator');

const {
  create,
  login,
  update
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', 
          body('name').notEmpty(),
          body('email').isEmail(),
          body('password').isLength({min:6}),
          body('phone_number').isNumeric().not(),
        create);

router.post('/login',login);
router.post('/update',update);

module.exports = router;

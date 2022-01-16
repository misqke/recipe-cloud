const {check} = require('express-validator');

const userSignUpValidator = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required'),
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 charactes long')
];

const userLogInValidator = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Enter username to log in'),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
];

module.exports = {
  userSignUpValidator,
  userLogInValidator
}
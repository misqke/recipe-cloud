const express = require('express')
const router = express.Router();

// controllers
const {signUp, logIn, logOut} = require('../controllers/auth');

// validators
const {runValidation} = require('../validators');
const {userSignUpValidator, userLogInValidator} = require('../validators/auth');

// routes
router.route('/login').post(userLogInValidator, runValidation, logIn);
router.route('/signup').post(userSignUpValidator, runValidation, signUp);
router.route('/logout').get(logOut);


module.exports = router
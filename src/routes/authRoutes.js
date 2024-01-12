const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { escape } = require('validator');

const { signUp, login } = require('../controllers/authController');

const escapeInput = (value) => {
    return escape(value);
};

const signUpValidation = [
    body('username')
        .trim()
        .isEmail().withMessage('Username must be a valid email address')
        .customSanitizer(escapeInput),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~|]/).withMessage('Password must contain at least one of the valid symbols')
        .customSanitizer(escapeInput)
];

const loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .customSanitizer(escapeInput),
    body('password')
        .notEmpty().withMessage('Password is required')
        .customSanitizer(escapeInput)
];

router.post('/signup', signUpValidation, signUp);
router.post('/login', loginValidation, login);

module.exports = router;
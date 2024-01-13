const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { escape } = require('validator');
const rateLimit = require('express-rate-limit');
const config = require('../config');

const { RateLimitError } = require('../models/customErrors');
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

const signUpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    handler: (req, res, next) => {
        next(new RateLimitError("Too many accounts created from this IP, please try again after 15 minutes"));
    }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    handler: (req, res, next) => {
        next(new RateLimitError("Too many login attempts from this IP, please try again after 15 minutes"));
    }
});

const applyRateLimiter = (limiter) => {
    if (config.disableRateLimit == 'false'){
        return limiter;
    } else {
        return (req, res, next) => next();
    }
};

router.post('/signup', signUpValidation, applyRateLimiter(signUpLimiter), signUp);
router.post('/login', loginValidation, applyRateLimiter(loginLimiter), login);

module.exports = router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const { AuthenticationError, ValidationError } = require('../models/customErrors');
const logger = require('../utils/logger');

const signUp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array().map(err => err.msg).join(', '));
        }

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new AuthenticationError('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        logger.info(`User created: ${username}`);
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        logger.error(`SignUp Error: ${error.message}, Username: ${req.body.username}`);
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array().map(err => err.msg).join(', '));
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AuthenticationError('Invalid username or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        logger.info(`Login successful: ${username}`);
        res.status(200).json({ token });
    } catch (error) {
        logger.error(`Login Error: ${error.message}, Username: ${req.body.username}`);
        next(error);
    }
};

module.exports = { signUp, login };
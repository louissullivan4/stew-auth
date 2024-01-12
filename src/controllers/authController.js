const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');

const signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation errors:', errors.array());
            return res.status(400).json({ message: 'Invalid input. Please check your data and try again.' });
        }

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Invalid input. Please check your data and try again.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Invalid input. Please check your data and try again.' });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation errors:', errors.array());
            return res.status(400).json({ message: 'Invalid input. Please check your data and try again.' });
        }

        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(202).json({ token });
        } else {
            res.status(400).json({ message: 'Invalid input. Please check your data and try again.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Invalid input. Please check your data and try again.' });
    }
};

module.exports = { signUp, login };
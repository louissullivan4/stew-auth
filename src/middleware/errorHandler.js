const { AuthenticationError, ValidationError, RateLimitError } = require('../models/customErrors');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: `Error: ${err.message}, Path: ${req.path}, Method: ${req.method}`,
        type: err.name
    });

    if (err instanceof ValidationError) {
        return res.status(400).json({ message: 'Invalid input. Please try again.' });
    } 

    else if (err instanceof AuthenticationError) {
        return res.status(400).json({ message: 'Invalid input. Please try again.' });
    } 

    else if (err instanceof RateLimitError) {
        return res.status(429).json({ message: err.message });
    }
    
    else {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = errorHandler;

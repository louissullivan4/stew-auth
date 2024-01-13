let logger = require('./logger');
let mongoose = require('mongoose');

const disconnectDatabase = async () => {
    try {
        await mongoose.disconnect();
        logger.info('MongoDB Disconnected');
    } catch (err) {
        logger.error(`Database disconnection error: ${err.message}`);
    }
};

module.exports = disconnectDatabase;
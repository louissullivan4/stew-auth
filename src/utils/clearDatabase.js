const mongoose = require('mongoose');
const logger = require('./logger');

async function clearDatabase() {
    try {
        const models = mongoose.models;
        for (const modelName of Object.keys(models)) {
            const model = models[modelName];
            await model.deleteMany({});
        }
        logger.info('Database cleared successfully.');
    } catch (error) {
        logger.error(`Error clearing database: ${error.message}`);
    }
}

module.exports = clearDatabase;

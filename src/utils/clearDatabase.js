const mongoose = require('mongoose');

// Define a function to clear the database
async function clearDatabase() {
    try {
        const models = mongoose.models;
        for (const modelName of Object.keys(models)) {
            const model = models[modelName];
            await model.deleteMany({});
        }
        console.log('Database cleared successfully.');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
}

module.exports = clearDatabase;

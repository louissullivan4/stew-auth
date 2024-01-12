const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const clearDatabase = require('./utils/clearDatabase');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');

const createApp = (clearDB = true) => {
    const app = express();
    app.use(cors());

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            logger.info('MongoDB Connected');
            if (clearDB) {
                clearDatabase();
            }
        })
        .catch(err => logger.error(`Database connection error: ${err.message}`));

    app.use(express.json());
    app.use('/auth', authRoutes);
    app.use(errorHandler);

    return app;
};

const PORT = process.env.PORT || 3005;

if (process.env.NODE_ENV !== 'test') {
    const app = createApp();
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

module.exports = createApp;
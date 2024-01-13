const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const logger = require('./utils/logger');
const clearDatabase = require('./utils/clearDatabase');
const disconnectDatabase = require('./utils/disconnectDatabase');

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const createApp = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    try {
        await mongoose.connect(config.mongoURI);
        logger.info('MongoDB Connected');
        if (config.clearDB === 'true') {
            await clearDatabase();
        }
    } catch (err) {
        logger.error(`Database connection error: ${err.message}`);
        process.exit(1);
    }

    app.use('/auth', authRoutes);
    app.use(errorHandler);

    return app;
};

module.exports = createApp;

if (require.main === module) {
    const PORT = config.port;
    logger.info(`Attempting to start server on port ${PORT}`);
    createApp().then(app => {
        const server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        const gracefulShutdown = async () => {
            await disconnectDatabase();
            server.close(() => {
                logger.info('Server shut down gracefully');
            });
        };

        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    });
}
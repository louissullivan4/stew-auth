const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const clearDatabase = require('./utils/clearDatabase');
const cors = require('cors');

const createApp = (clearDB = false) => {
    const app = express();
    app.use(cors());
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected');
            if (clearDB) {
                clearDatabase();
            }
        })
        .catch(err => console.log(err));

    app.use(express.json());
    app.use('/auth', authRoutes);

    return app;
};

const PORT = process.env.PORT || 3005;

if (process.env.NODE_ENV !== 'test') {
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = createApp;
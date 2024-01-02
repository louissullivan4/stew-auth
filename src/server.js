const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
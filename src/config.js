require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev' });

module.exports = {
    mongoURI: process.env.MONGO_URI,
    clearDB: process.env.CLEAR_DB || 'false',
    port: process.env.PORT || 3005,
    disableRateLimit: process.env.DISABLE_RATE_LIMIT || 'false'
};
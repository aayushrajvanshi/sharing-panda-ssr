const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.db, {
    useMongoClient: true
});

//Use Native Promise
mongoose.Promise = global.Promise;

module.exports = db = mongoose.connection;
const { connect, connection } = require('mongoose');

const stringX = process.env.MONGODB_URI || 'mongodb://localhost/socialapi';

connect(stringX,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

module.exports = connection;
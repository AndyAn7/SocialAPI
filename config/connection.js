const { connect, connection } = require('mongoose');

const stringX = 'mongodb+srv://AndyRooh:Ghengis01!@clustone.ugmya.mongodb.net/test'

connect(stringX,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

module.exports = connection;
const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { users, thoughts } = require('./data.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to Social db');

    // clear exisiting user data
    await User.deleteMany({});

    // clear existing thought data
    await Thought.deleteMany({});

    //add user and await results 
    await User.collection.insertMany(users);

    // adds thoughts and awaits returns
    await Thought.collection.insertMany(thoughts);

    // add followers and thoughts to the users
    await User.collection.findOneAndUpdate(
        { _id: users[0]._id },
        { $addToSet: { followers: users[1]._id } }
    );
    
    await User.collection.findOneAndUpdate(
        { _id: users[1]._id },
        { $addToSet: { followers: users[0]._id, thoughts: thoughts[1]._id } }
    );

// provides seed data for databse via logs
console.table(users);
console.table(thoughts);
console.info('Seeding complete');
process.exit();
});
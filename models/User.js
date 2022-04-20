const { Schema, model } = require('mongoose');

const userS = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        // REGEX to validae email address
        match: [
          /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          "Please provide a valid email address.",
        ],
        required: [true, "Email required"],
    },

    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]},

    {
        toJSON: {
            virtuals: true,
        }});

userS.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userS);

const handleError = (err) => console.log(err);

module.exports = User;
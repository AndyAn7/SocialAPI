const { Schema, Types, model } = require('mongoose');

const reactS = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Reaction body must be 280 characters or less'],
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
            return this.toLocaleString();
        }}},
        {
            id: false
        });

const thoughtS = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: [1, 'Thought must be 1 character or more'],
        maxlength: [280, 'Thought must be 280 characters or less'],
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
            return this.toLocaleString();
        }},

    username: {
        type: String,
        required: true,
    },

    reactions: [reactS],
        }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    });

thoughtS.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtS);

const handleError = (err) => console.error(err);

module.exports = Thought;
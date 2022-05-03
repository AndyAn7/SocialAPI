const { User, Thought } = require('../models');
const { Types } = require('mongoose');

module.exports = {

    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
            !thought 
            ? res.sendStatus(404).json({ message: 'Not found' }) 
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.user._id },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
            )})

            .then((user) =>
                !user
                ? res.sendStatus(404).json({ 
                    message: 'Thought received; ID not found'
                })
                : res.json('Created!')
            )
            
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                ? res.sendStatus(404).json({ 
                    message: 'Not found'})
                : User.deleteMany({ _id: { $in: thought.reaction} })
            )
            .then(() => res.json({ message: 'Deleted!' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Not found' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },  
    
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToset: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought    
            ? res.status(404).json({ message: 'Not found' })
            : res.json(thought)
            )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Not found' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
    },

};
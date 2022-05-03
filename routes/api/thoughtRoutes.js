const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
    } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtid').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtid/reactions').post(addReaction);

router.route('/:thoughtid/reactions/:reactionid').delete(deleteReaction);

module.exports = router;
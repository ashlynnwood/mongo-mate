const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction, 
  deleteReaction,
} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/')
  // GET all thoughts
  .get(getThoughts)
  // Create a thought
  .post(createThought);
  // push the created thought's _id to associated user's `thoughts` array field

// /api/thoughts/:id
router.route('/:id')
  // Get single thought by its _id
  .get(getThoughtById)
  // Update thought by id
  .put(updateThought)
  // Delete thought by id
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  // POST to create a reaction stored in a single thought's `reactions` array field
  .post(createReaction)
  // DELETE to pull and remove a reaction by the reaction's `reactionId` value
  .delete(deleteReaction)

module.exports = router;

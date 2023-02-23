const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thought-controller.js');

// /api/thoughts
router.route('/')
  // GET to get all thoughts
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

router.route('/api/thoughts/:thoughtId/reactions')
  // POST to create a reaction stored in a single thought's `reactions` array field
  .post()
  // DELETE to pull and remove a reaction by the reaction's `reactionId` value
  .delete()

module.exports = router;

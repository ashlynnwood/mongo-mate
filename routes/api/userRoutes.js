const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById);

router.route('/api/users/:userId/friends/:friendId')
// POST to add a new friend to a user's friend list
    .post(addFriend)
// DELETE to remove a friend from a user's friend list
    .delete(deleteFriend)

// export router so app can use it
module.exports = router;

// /api/users
// GET all users
// GET single user by _id and populated thought and friend data
// POST a new user
// PUT to update a user by its _id
// DELETE to remove user by its _id
// Remove a user's associated thoughts when deleted


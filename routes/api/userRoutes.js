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
router.route('/')
  // GET all users  
  .get(getUsers)
  // POST a new user
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getUserById)
  // PUT to update a user by its _id
  .put(updateUser)
  // DELETE to remove user by its _id
  .delete(deleteUser);

router.route('/:userId/friends/:friendId')
// POST to add a new friend to a user's friend list
    .post(addFriend)
// DELETE to remove a friend from a user's friend list
    .delete(deleteFriend)

// export router so app can use it
module.exports = router;


// GET single user by _id and populated thought and friend data
// Remove a user's associated thoughts when deleted


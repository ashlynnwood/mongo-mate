const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find({})
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500);
    })
  },

// Find a single user by ID
 getUserById(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    // Get associated friends and thoughts 
    .populate('friends')
    .populate('thoughts')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
      )
 .catch((err) => res.status(500).json(err));
},

// Create a new user
createUser(req, res) {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));

},
// Delete a user and associated thoughts
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((user) => {
      res.json(user)
      Thought.deleteMany({ _id: {$in: user.thoughts} });
    })
    .catch((err) => res.status(500).json(err));
},
// Update a user
updateUser(req, res) {
  User.findOneAndUpdate( req.body, { _id: req.params.userId }, {new: true, runValidators: true })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
addFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, {$addToSet: { friends: req.params.friendId }}, {new: true})
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err));
},
deleteFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, {$pull: { friends: req.params.friendId }}, {new: true})
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err));
}

}

module.exports = userController;
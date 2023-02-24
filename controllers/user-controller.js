const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find({})
    .populate('friends')
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
      res.status(500);
    })
  },


 getUserById(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
      )
 .catch((err) => res.status(500).json(err));
},

// create a new user
createUser(req, res) {
  User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));

},
// delete a user
deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((dbUserData) => {
      res.json(dbUserData)
      Thought.deleteMany({ _id: {$in: dbUserData.thoughts} });
    })
    .catch((err) => res.status(500).json(err));
},
// delete a user
updateUser(req, res) {
  User.findOneAndUpdate( req.body, { _id: req.params.userId }, {new: true, runValidators: true })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
},
addFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, {$addToSet: { friends: req.params.friendId }}, {new: true})
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
},
deleteFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, {$pull: { friends: req.params.friendId }}, {new: true})
  .then((dbUserData) => res.json(dbUserData))
  .catch((err) => res.status(500).json(err));
}

}

module.exports = userController;
const { User, Thought } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find({})
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
      console.log(err);
      res.status(500);
    })
  },


 getThoughtById(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
      )
 .catch((err) => res.status(500).json(err));
},

// create a new thought
createThought(req, res) {
  Thought.create(req.body)
    .then((thoughtData) => {
      res.json(thoughtData) 
      User.findOneAndUpdate({_id: req.body.userId}, {$push: {thoughts: thoughtData._id}}, {new: true})
    })

    .catch((err) => res.status(500).json(err));

},
// delete a thought
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thoughtData) => {
      res.json(thoughtData)
      User.findOneAndUpdate({_id: req.body.userId}, {$pull: {thoughts: thoughtData._id}}, {new: true})
    })
    .catch((err) => res.status(500).json(err));
},

// update a thought
updateThought(req, res) {
  Thought.findOneAndUpdate( req.body, { _id: req.params.thoughtId }, {new: true, runValidators: true })
    .then((thoughtData) => res.json(thoughtData))
    .catch((err) => res.status(500).json(err));
},

createReaction(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$addToSet: { reactions: req.body }}, {new: true, runValidators: true })
  .then((thoughtData) => res.json(thoughtData))
  .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull: { reactionss: req.params.reactionId }}, {new: true, runValidators: true})
  .then((thoughtData) => res.json(thoughtData))
  .catch((err) => res.status(500).json(err));
}

}

module.exports = thoughtController;
const { User, Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({})
      res.json(thoughts)
    } catch(err) {
      console.log(err);
      res.status(500);
    }
  },

  // Get single thought
 async getThoughtById(req, res) {
  try {
  const thought = await Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID :(' })
      }
    res.json(thought)
    } catch(err) {
      res.status(500).json(err)
    }
},

// create a new thought
async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body) 
    await User.findOneAndUpdate(
      {_id: req.body.userId}, 
      {$push: {thoughts: thought._id}}, 
      {new: true});
    res.json(thought);

  }catch(err) {
    console.error(err)
    res.status(500).json(err);
  }
},

// delete a thought
async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
    await User.findOneAndUpdate(
      {_id: req.body.userId}, 
      {$pull: {thoughts: thought._id}}, 
      {new: true});
  res.json(thought); 
  } catch(err) {
    res.status(500).json(err);
  }
},

// update a thought
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate( 
      req.body, 
      { _id: req.params.thoughtId }, 
      {new: true, runValidators: true });
    res.json(thought)
  } catch(err) {
    res.status(500).json(err);
  }
},

async createReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$addToSet: { reactions: req.body }}, 
      {new: true, runValidators: true });
    res.json(thought);
  } catch(err) {
    console.error(err)
    res.status(500).json(err);
  }
},

async deleteReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      {$pull: { reactionss: req.params.reactionId }}, 
      {new: true, runValidators: true});
    res.json(thought);
  }catch(err){
    res.status(500).json(err);
    }
  }
}

module.exports = thoughtController;
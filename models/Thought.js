const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: { 
      type: String, 
      required: true,
      minlength: 1,
      maxlength: 280,
      // Must be between 1 and 280 characters
     },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
      },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual `reactionCount` that gets the length of the thought's `reactions` array
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });


// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema({
    thoughtText: { 
      type: String, 
      required: true,
      // Must be between 1 and 280 characters
     },
    createdAt: {
      // Date
      // Set default value to the current timestamp
      // Use a getter method to format the timestamp on query
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
    reactions: [
      // Array of nested documents created with the `reactionSchema`
    ],
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
    return this.length;
  });


// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
/* 
Activity 17/18 - use reaction model, use this schema as array in thought model
so thought are array like this [___Schema]

thought will have [reactionSchema]

*/

const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema({
    reactionId: { 
    //  Use Mongoose's ObjectId data type
    //  Default value is set to a new ObjectId
     },
    reactionBody: {
      type: String, 
      required: true,
      // 280 character maximum
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
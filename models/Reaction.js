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
      type: Schema.Types.ObjectId,
    //  Default value is set to a new ObjectId
      default: () => new Types.ObjectId,
     },
    reactionBody: {
      type: String, 
      required: true,
      maxlength: 280,
      // 280 character maximum
     },
     username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      // Set default value to the current timestamp
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);



module.exports = reactionSchema;
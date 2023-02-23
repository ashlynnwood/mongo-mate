/* 
const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts' }]
  
});

^ this brings back list of thoughts Ids
to actually show data, have to populate
*/

// user has subdocu of friends
// thoughts have subdocu of reaction
// user has thoughts - have to populate their thoughts

const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: { 
      type: String, 
      required: true,
      unique: true,
     },
    email: {
       type: String, 
       required: true,
       unique: true,
       validate: {
          validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
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

// Create a virtual property `friendCount` that retrieves the length of the user's `friends` array
userSchema
  .virtual('friendName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
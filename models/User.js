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
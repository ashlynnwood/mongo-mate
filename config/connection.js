const { connect, connection } = require('mongoose');

// Local connection to MongoDB
connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = connection;

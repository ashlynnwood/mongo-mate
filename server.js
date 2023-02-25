// Import Express
const express = require('express');
// Import DB connection
const db = require('./config/connection');
// Import routes
const routes = require('./routes');

// Set up port
const PORT = 3001;
// Create instance of express app
const app = express();


app.use(express.urlencoded({ extended: true }));
// Middleware to parse to json 
app.use(express.json());
app.use(routes);

db.once('open', () => {
  // Server is listening...
  app.listen(PORT, () => {
    console.log(`API server for Mongo Mate is running on port ${PORT}!`);
  });
});

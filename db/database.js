// Import Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define a function to establish a connection to MongoDB using the provided URL
const dbConnection = (url) => {
  // Set 'strictQuery' option to false to allow using queries with undefined fields (helps with MongoDB version compatibility)
  mongoose
    .set("strictQuery", false)
    .connect(url) // Connect to MongoDB using the provided connection URL
    .then(() => {
      console.log("Connected to MongoDB"); // Log success message once connected
    })
    .catch((err) => {
      console.log(err); // Log any error that occurs during the connection process
    });
};

// Export the dbConnection function so it can be used in other parts of the application
module.exports = { dbConnection };

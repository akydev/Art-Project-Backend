// Import necessary modules
const express = require("express"); // Import Express framework to handle server routing
const { dbConnection } = require("./db/database"); // Import custom database connection function
const userRoutes = require("./routing/user"); // Import user-specific routes

// Create an Express app instance
const app = express();

// Define the port the server will run on
const port = 3001;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Define the root route that sends a simple greeting
app.get("/", (req, res) => {
  res.send("Hello World!"); // Sends a "Hello World!" message when accessed via GET
});

// Use the user-specific routes under the '/api/user' endpoint
// Corrected the route by adding the leading '/' to make sure it's correctly prefixed
app.use("/api/user", userRoutes);

// Function to establish a database connection and start the server
const startConnection = async () => {
  try {
    // Connect to MongoDB using the provided connection string
    await dbConnection("mongodb://localhost:27017/artprojectbackend");

    // Once database connection is successful, start the server
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`); // Log that the server is running
    });
  } catch (error) {
    console.log(error); // Log any error that occurs during the database connection or server startup
  }
};

// Invoke the function to start both the database connection and the server
startConnection();

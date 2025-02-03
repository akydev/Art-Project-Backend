// Import the Express framework
const express = require("express");

// Import the user controller functions to handle requests
const {
  create, // Function to handle creating a new user
  lists, // Function to list all users
  updateUser, // Function to handle updating a user
  deleteUser, // Function to handle deleting a user
} = require("../controllers/user");
const authMiddleware = require("../middleware/auth");
const { loginUser } = require("../controllers/authController");

// Create a new Express router instance to define user-related routes
const router = express.Router();

// Define the POST and GET routes for the root of '/api/user' endpoint
// POST - Calls the 'create' function to add a new user
// GET - Calls the 'lists' function to retrieve a list of users
router.route("/").post(create).get(authMiddleware, lists);

router.route("/login").post(loginUser);

// Define the PUT and DELETE routes for the '/api/user/:id' endpoint
// PUT - Calls the 'updateUser' function to update a specific user by ID
// DELETE - Calls the 'deleteUser' function to delete a specific user by ID
router.route("/:id").put(updateUser).delete(deleteUser);

// Export the router so it can be used in other parts of the application (e.g., in the main app file)
module.exports = router;

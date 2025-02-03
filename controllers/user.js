// Import the User model to interact with the 'users' collection in MongoDB
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Function to create a new user
const create = async (req, res) => {
  try {
    // Destructure necessary fields from the request body
    const { firstName, lastName, age, email, password } = req.body;

    // Check if all required fields are present in the request body
    if (!firstName || !lastName || !age || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    // Create a new user document in the database
    const user = await User.create({
      firstName,
      lastName,
      age,
      email,
      password: hashPassword,
    });

    // Respond with the newly created user and a status of 201 (created)
    res.status(201).json({ user });
  } catch (error) {
    console.log(error); // Log any errors that occur
    res.status(500).json({ message: error.message }); // Send a 500 internal error response
  }
};

// Function to retrieve a list of all users
const lists = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({});

    // Respond with the list of users and a status of 200 (OK)
    res.status(200).json({ users });
  } catch (error) {
    console.log(error); // Log any errors that occur
    res.status(500).json({ message: "Internal server error!" }); // Send a 500 internal error response
  }
};

// Function to update an existing user by their ID
const updateUser = async (req, res) => {
  try {
    // Extract the user ID from the route parameters
    const { id } = req.params;

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, genSalt);

    // Find the user by ID and update their data, return the updated user document
    const user = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: hashPassword },
      {
        new: true, // Return the updated user document
        runValidators: true, // Ensure that validation rules are applied during the update
      }
    );

    // If the user wasn't found, send a 404 not found response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user and a status of 200 (OK)
    res.status(200).json({ user });
  } catch (error) {
    console.log(error); // Log any errors that occur
    res.status(500).json({ message: error.message }); // Send a 500 internal error response
  }
};

// Function to delete a user by their ID
const deleteUser = async (req, res) => {
  try {
    // Extract the user ID from the route parameters
    const { id } = req.params;

    // Find the user by ID and delete the user document
    const user = await User.findByIdAndDelete(id);

    // If the user wasn't found, send a 404 not found response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with a success message indicating the user was deleted
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error); // Log any errors that occur
    res.status(500).json({ message: "Internal server error!" }); // Send a 500 internal error response
  }
};

// Export all controller functions to be used in the routes
module.exports = { create, lists, updateUser, deleteUser };

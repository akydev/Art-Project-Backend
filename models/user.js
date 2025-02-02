// Import Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the User schema to structure the user data in the database
const UserSchema = new mongoose.Schema({
  // First name of the user, required field of type String
  firstName: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is not empty (mandatory)
  },

  // Last name of the user, required field of type String
  lastName: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is not empty (mandatory)
  },

  // Age of the user, required field of type Number
  age: {
    type: Number, // Specifies the data type as Number
    required: true, // Ensures the field is not empty (mandatory)
  },

  // Email address of the user, required field of type String and must be unique
  email: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is not empty (mandatory)
    unique: true, // Ensures the email is unique across the collection (no duplicates)
  },

  // Password for the user, required field of type String
  password: {
    type: String, // Specifies the data type as String
    required: true, // Ensures the field is not empty (mandatory)
  },
});

// Create the 'User' model based on the UserSchema
// This model will be used to interact with the 'users' collection in MongoDB
const User = mongoose.model("User", UserSchema);

// Export the 'User' model so it can be used in other parts of the application
module.exports = User;

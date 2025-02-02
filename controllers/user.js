const User = require("../models/user");

const create = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;
    if (!firstName || !lastName || !age || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create({
      firstName,
      lastName,
      age,
      email,
      password,
    });
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const lists = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = { create, lists, updateUser, deleteUser };

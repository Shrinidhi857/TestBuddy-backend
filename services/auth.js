const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function register(username, password) {
  const user = new User({ username, password }); // plain text password
  return await user.save(); // model will hash it
}

async function login(username, password) {
  console.log("Login attempt:", { username, password });

  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  console.log("Password match result:", isMatch);

  if (!isMatch) throw new Error("Invalid credentials");

  return user;
}

module.exports = {
  login,
  register,
};

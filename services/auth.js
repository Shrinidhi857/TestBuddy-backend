const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function register(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  return await user.save();
}

async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user; // ✅ return full mongoose user doc instead of custom object
}

module.exports = {
  login,
  register,
};

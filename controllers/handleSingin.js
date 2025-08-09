const userService = require("../services/auth");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userService.register(username, password);
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created",
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userService.login(username, password); // should return user object

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { _id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function protected(req, res) {
  res.json({
    message: "Access granted to protected route",
    user: req.user, // now contains _id from token
  });
}

module.exports = {
  protected,
  login,
  register,
};

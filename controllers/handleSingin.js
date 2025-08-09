const userService = require("../services/auth");

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userService.register(username, password);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const data = await userService.login(username, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

async function protected(req, res) {
  res.json({ message: "Access granted to protected route", user: req.user });
}

module.exports = {
  protected,
  login,
  register,
};

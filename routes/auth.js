const express = require("express");
const router = express.Router();
const User = require("../models/User");

const createErrorResponse = (message) => ({
  error: message,
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json(createErrorResponse("User already registered with this email"));
    }

    const newUser = await User.create({ email, password });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json(createErrorResponse("Internal Server Error"));
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(403).json(createErrorResponse("Invalid credentials"));
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json(createErrorResponse("Internal Server Error"));
  }
});

module.exports = router;

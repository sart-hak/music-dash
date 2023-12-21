const { json } = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;

  const user = await User.findOne({ email: email });
  //if user exists
  if (user) {
    return res
      .status(403)
      .json({ error: "user already registered with is email" });
  }
     
  const userData = {
    email,
    password,
  };
  const newUser = await User.create(userData);
  return res.status(200).json(newUser);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ error: "invalid credentials" });
  }

  if (!password) {
    return res.status(403).json({ error: "invalid credentials" });
  }

  return res.status(200).json(user);
});

module.exports = router;

    


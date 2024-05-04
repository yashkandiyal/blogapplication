const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const privateKey = process.env.SECRET_KEY;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userDetails = await User.findOne({ username });
    if (!userDetails) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userDetails.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ username, id: userDetails._id }, privateKey);

    // Set a cookie named 'token' containing the JWT token
    // Also, set a cookie named 'username' containing the username
    res.cookie("token", token);
    res.cookie("username", username);

    return res.status(200).json({msg:"success"})
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

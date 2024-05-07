const express = require("express");
const router = express.Router();
const Post = require("../models/Posts.js");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const privateKey = process.env.SECRET_KEY;
router.get("/", async (req, res) => {
  try {
    const allData = await Post.find();
    const { token } = req.cookies;
    
    jwt.verify(token, privateKey, {}, (err, info) => {
      if (err) throw err;
      res.status(200).json({ allPosts: allData, userDetails: info });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

module.exports = router;

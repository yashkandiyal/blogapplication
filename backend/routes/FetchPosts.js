const express = require("express");
const router = express.Router();
const Post = require("../models/Posts.js");

router.get("/", async (req, res) => {
  try {
    const allData = await Post.find();
    console.log(allData);
    res.status(200).json(allData); // Send the fetched data as a JSON response
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

module.exports = router;

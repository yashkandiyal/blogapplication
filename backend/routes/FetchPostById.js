// Import necessary modules
const express = require("express");
const Post = require("../models/Posts");

// Define the route handler function
const FetchPostById = async (req, res) => {
  try {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    // Query the database to find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // If the post exists, send it in the response
    res.status(200).json(post);
  } catch (error) {
    // Handle errors
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the route handler function
module.exports = FetchPostById;

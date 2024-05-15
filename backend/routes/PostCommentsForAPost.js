const express = require("express");
const Comments = require("../models/Comments.js");
const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, postId, comment } = req.body;

  // Check if all required fields are provided
  if (!userId || !postId || !comment) {
    return res.status(400).json("Please provide all the details!");
  }

  try {
    // Find the user by userId
    const user = await User.findOne({ _id: userId });

    // If user not found, return error
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Create a new comment with username
    const commentSaved = await Comments.create({
      userId,
      postId,
      comment,
      username: user.username,
    });

    // Find the post by postId
    const post = await Posts.findById(postId);

    // If post not found, return error
    if (!post) {
      return res.status(404).json("Post not found");
    }

    // Push the comment ID to the post's comments array
    post.comments.push(commentSaved._id);

    // Save the post
    await post.save();

    // Return success message
    return res.status(201).json("Comment posted successfully");
  } catch (error) {
    // Return error message
    return res.status(400).json("Error in posting comment");
  }
});

module.exports = router;

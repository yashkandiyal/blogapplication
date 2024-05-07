const express = require("express");
const Like = require("../models/Likes");
const Post = require("../models/Posts");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    // Check if there is an existing like for the given userId and postId
    const existingLike = await Like.findOne({ userId, postId });

    // If there is an existing like, remove it
    if (existingLike) {
      await Like.deleteOne({userId,postId})
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      const post = await Post.findById(postId);
      const likesCount = post.likes.length;
      return res
        .status(200)
        .json({ message: "Post unliked successfully", likesCount });
    }

    // Otherwise, add a new like
    await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
    await Like.create({ userId, postId });

    // Get the updated post and its likes count
    const updatedPost = await Post.findById(postId);
    const likesCount = updatedPost.likes.length;

    // Send success response with updated likes count
    return res
      .status(200)
      .json({ message: "Post liked successfully", likesCount });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

module.exports = router;

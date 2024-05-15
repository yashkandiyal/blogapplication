const express = require("express");
const Comments = require("../models/Comments.js");
const Posts = require("../models/Posts.js");
const router = express.Router();

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const allComments = await Comments.find({ postId }); // Find comments by postId
    return res.status(200).json(allComments);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error in fetching comments", message: error.message });
  }
});

module.exports = router;

//postid:6639e8a2c1dfe2e4d11f8863
//userid:66322fa74a05f4d85c761012

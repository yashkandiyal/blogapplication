const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/Posts");
const cloudinary = require("cloudinary").v2;
const Authentication = require("../Authentication");
const User = require("../models/User.js");

require("dotenv/config");
// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, summary, content, userId } = req.body;
    const { username } = await User.findById(userId);

    const imageUrl = req.file ? req.file.buffer.toString("base64") : null; // Get image as base64 string from buffer

    // Upload image to Cloudinary
    let cloudinaryRes;
    if (imageUrl) {
      cloudinaryRes = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${imageUrl}`
      );
    }
    await Post.create({
      title,
      summary,
      content,
      createdBy: username,
      createdByUserId: userId,
      imageUrl: cloudinaryRes ? cloudinaryRes.secure_url : null, // Check if cloudinaryRes exists before accessing its properties
    });
    res.status(200).json({
      msg: "create post data received successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;

// Import mongoose
const mongoose = require("mongoose");

// Define the schema for the blog post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type:String,
   
  },
});

// Create the model for the blog post
const Post = mongoose.model("Post", postSchema);

// Export the model
module.exports = Post;

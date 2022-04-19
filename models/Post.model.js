const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema ({
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema)

module.exports = Post
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema ({
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: { 
       type: String,
      max: 50,
      required: true,

    }, 
    body: { 
      type: String,
      max: 1000,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = model('Post', postSchema)

module.exports = Post 
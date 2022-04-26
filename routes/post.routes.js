const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

const router = express.Router();

//create a post
router.post("/create", async (req, res) => {
  const { description } = req.body;
  const post = await Post.create({
    description,
    user: req.jwtPayload.user._id,
  });
  res.status(200).json(post);
});

//update a post
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  let post = await Post.findById(id);
  if (post.user.toString() === req.jwtPayload.user._id) {
    post.description = description;
    post = await post.save();
    res.status(200).json(post);
  } else {
    res.status(400).json("unauthorized");
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.user.toString() === req.jwtPayload.user._id) {
    await Post.findByIdAndDelete(id);
    res.status(200).json(post);
  } else {
    res.status(400).json("unauthorized");
  }
});

/*//like / dislike a post
router.put("/:id/like", async (req, res) => {
  const { id } = req.params;
    const post = await Post.findById(id);
    if (!post.likes.includes(req.jwtPayload.user._id)) {
      await post.updateOne({ $push: { likes: req.jwtPayload.user._id } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.jwtPayload.user._id} });
      res.status(200).json("The post has been disliked");
    }  
});
*/

//get all owned posts
router.get("/owned", async (req, res) => {
  try {
    // find post associated with a user
    const posts = await Post.find({ user: req.jwtPayload.user._id }).populate("user");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

module.exports = router;

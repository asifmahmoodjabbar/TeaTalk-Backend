const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    userName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const User = require("../models/User.model");
const validate = require("../middlewares/validate.middleware");
const { authenticate } = require("../middlewares/jwt.middleware");



const router = express.Router();

// Create a user/signup
router.post(
  "/signup",
  validate([    
    body("userName").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ]),
  async (req, res) => {
    const { userName, email, password } = req.body;
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({
        userName,
        email,
        password: passwordHash,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // find a user a given email
  const user = await User.findOne({ email });
  // if user exists
  if (user) {
    // check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    // if password is correct
    if (passwordCorrect) {
      // create a payload
      const payload = {
        user,
      };
      // create a token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      // send the token and the user to the front end
      res.status(200).json({
        token,
        user,
      });
    } else {
      res.status(401).send("email or password are incorrect");
    }
  } else {
    res.status(401).send("email or password are incorrect");
  }
});

//verification
router.get("/verify", authenticate, (req, res) => {
  res.status(200).json({
    user: req.jwtPayload.user,
  });
});

module.exports = router;

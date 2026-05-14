const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER ROUTE
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;
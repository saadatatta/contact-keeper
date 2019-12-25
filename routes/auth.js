const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../middleware/user');
const User = require("../models/User");

// @route       POST    /api/auth
// @desc        Authencticate user and get token
// @access      Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").notEmpty()
  ],
  async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    try {
      let isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched)
        return res.status(400).json({ msg: "Email or password is incorrect" });
      let payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// @route       GET    /api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", auth,async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password");
      res.json({user})
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: error.message})
  }
});

module.exports = router;

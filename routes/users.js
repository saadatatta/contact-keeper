const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
// @route       POST    /api/users
// @desc        Register a user
// @access      Public
router.post(
  "/",
  [
    check("name", "Name field is required").notEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be minimum 6 characters long").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email  Address already taken" });
      }
      user = new User({ name, email, password });
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      let payload = {
        user: { id: user.id }
      };
      jwt.sign(payload, config.get("jwtToken"), { expiresIn: 36000 },(error,token)=>{
        if(error) throw error;
        res.status(200).json({token});
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;

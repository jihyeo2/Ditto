const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/user");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

router.post(
  "/",
  [auth, validateWith({ token: Joi.string().required() })],
  async (req, res) => {
    console.log("finally reached backend of post request");
    const user1 = await User.findById(req.user._id);
    if (!user1) return res.status(400).send("Invalid user.");
    console.log("length", req.body.token.length);
    user1.expoPushToken = req.body.token.substring(18, 40);
    await user1.save();
    console.log("hehe", user1);

    console.log("User registered for notifications: ", user1);

    res.status(201).send();
  }
);

module.exports = router;

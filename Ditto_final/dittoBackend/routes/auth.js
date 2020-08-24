const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const Joi = require("joi");

router.post("/", async (req, res) => {
  console.log("route auth", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("ill go with you");
  let user = await User.findOne({ email: req.body.email });
  console.log("with you god");
  if (!user) return res.status(400).send("Invalid email or password");
  console.log("me too", user);

  const validPassword = await bcrypt.compare(req.body.password, user.password); //question. how does it find the salt we used? how is it stacked?
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  console.log("this is token", token);
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  };

  return Joi.validate(req, schema);
}

module.exports = router;

//TODO: change validate function to a middleware

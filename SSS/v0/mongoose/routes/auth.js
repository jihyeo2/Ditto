const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash"); //used to only show certain data to the client when res is sent
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password"); //400: bad request, 404:not found

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
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

//this module basically gives an webtoken to a valid user
// install joi-password-complexity to require more complex password to the users

const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  store: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
      },
    }),
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    profileImage: Joi.string(),
    name: Joi.string().required().min(3).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
    // store: Joi.objectId(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

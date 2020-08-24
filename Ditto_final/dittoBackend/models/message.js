const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  body: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  userId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(message) {
  const schema = {
    title: Joi.string().required().min(2).max(255),
    body: Joi.string().required().max(1024),
    userId: Joi.string().required().min(2).max(255),
  };

  return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validate = validateMessage;

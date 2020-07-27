const mongoose = require("mongoose");
const Joi = require("joi");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

function validateTest(test) {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(test, schema);
}

exports.Test = Test;
exports.validate = validateTest;

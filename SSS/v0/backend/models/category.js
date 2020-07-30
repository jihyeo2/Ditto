const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  icon: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  stores: [storeSchema],
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    label: Joi.string().required().min(2).max(255),
    icon: Joi.string().required().min(2).max(50),
    // stores: Joi.array().items(Joi.objectId()),
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;

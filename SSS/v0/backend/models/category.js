const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { storeSchema } = require("./store");

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  imageUri: {
    type: Number,
    required: true,
    min: 0,
    max: 8,
  },
  stores: [storeSchema],
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    label: Joi.string().required().min(2).max(255),
    imageUri: Joi.number().min(0).max(8).required(),
    // stores: Joi.array().items(Joi.objectId()), ---> no clue yet....
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;

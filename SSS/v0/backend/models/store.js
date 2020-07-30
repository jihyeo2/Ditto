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
  user: {
    type: new mongoose.Schema({
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
    }),
    required: true,
  },
  category: {
    type: new mongoose.Schema({
      label: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
      },
    }),
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  contact: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 12,
  },
  keyword: {
    type: String,
    minlength: 3,
    maxlength: 1024,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Store = mongoose.model("Store", storeSchema);

function validateStore(store) {
  const schema = {
    name: Joi.string().required().min(2).max(255),
    userId: Joi.objectId().required(),
    categoryId: Joi.objectId().required(),
    description: Joi.string().min(5).max(1024),
    location: Joi.string().required().min(2).max(1024),
    contact: Joi.string().required().min(9).max(12),
    keyword: Joi.string().required().min(3).max(1024),
  };

  return Joi.validate(store, schema);
}

exports.Store = Store;
exports.validate = validateStore;

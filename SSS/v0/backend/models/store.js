const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 8,
  },
  image: {
    type: String,
  },
});

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
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
    required: true,
    minlength: 2,
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
  openingHours: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  menus: [menuSchema],
  backgroundImage: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
});

const Store = mongoose.model("Store", storeSchema);

function validateStore(store) {
  const schema = {
    name: Joi.string().required().min(2).max(255),
    categoryId: Joi.objectId().required(),
    description: Joi.string().min(3).max(1024).required(),
    location: Joi.string().required().min(2).max(1024),
    contact: Joi.string().required().min(9).max(12),
    openingHours: Joi.string().required().min(2).max(1024),
    backgroundImage: Joi.string().required(),
    mainImage: Joi.string().required(),
    menus: Joi.array().items(Joi.object()), //objectId or object?
  };

  return Joi.validate(store, schema);
}

exports.Store = Store;
exports.storeSchema = storeSchema;
exports.validate = validateStore;

const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = {
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
};

const storeInNeedSchema = new mongoose.Schema({
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
  users: [userSchema],
});

const StoreInNeed = mongoose.model("StoreInNeed", storeInNeedSchema);

function validateStoreInNeed(storeInNeed) {
  const schema = {
    name: Joi.string().required().min(2).max(255),
    categoryId: Joi.objectId().required(),
    location: Joi.string().required().min(2).max(1024),
    contact: Joi.string().required().min(9).max(12),
  };

  return Joi.validate(storeInNeed, schema);
}

exports.StoreInNeed = StoreInNeed;
exports.validate = validateStoreInNeed;

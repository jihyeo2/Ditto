const { Store, validate } = require("../models/store");
const { Category } = require("../models/category");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const stores = await Store.find().sort("name");
  res.send(stores);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let store = await Store.findOne({ name: req.body.name }); //TODO: later change to userId
  if (store) return res.status(400).send("Store already registered.");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  store = new Store({
    name: req.body.name,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    category: {
      _id: category._id,
      label: category.label,
    },
    description: req.body.description,
    location: req.body.location,
    contact: req.body.contact,
  });

  try {
    new Fawn.Task()
      .save("stores", store)
      .update(
        "categories",
        { _id: category._id },
        {
          $addToSet: { stores: store },
        }
      )
      .update("users", { _id: user._id }, { $set: { store: store } })
      .run();
    res.send(store);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

router.get("/:id", async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

module.exports = router;

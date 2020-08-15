const { Store, validate } = require("../models/store");
const { Category } = require("../models/category");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Fawn = require("fawn");
const multer = require("multer");
const config = require("config");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.get("/", async (req, res) => {
  stores = await Store.find().sort("name");
  if (!stores) return res.status.send(400).send("None exists.");
  res.send(stores);
});

router.get("/:id", auth, async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

router.get("/search/:keyword", async (req, res) => {
  const stores = await Store.find({ keyword: req.params.keyword });
  if (!stores) return res.status.send(400).send("None exists.");
  res.send(stores);
});

router.post(
  "/",
  upload.array("images", config.get("maxImageCount")),
  async (req, res) => {
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
      openingHours: req.body.openingHours,
      keyword: req.body.keyword,
      backgroundImage: req.body.backgroundImage,
      mainImage: req.body.mainImage,
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
      res
        .status(500)
        .send("Error occured, thus the store was not added successfully.");
    }
  }
);

/*
put request should be done in the following manner: 
all values that have not changed should also be passed. If not passed, an error rises
*/

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const store = await Store.findById(req.params.id);
  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  const category = await Category.findById(req.body.categoryId);
  if (error) return res.status(400).send("Invalid category");

  const user = await User.findById(req.body.userId);
  if (error) return res.status(400).send("Invalid user");

  try {
    new Fawn.Task()
      .update(
        "stores",
        { _id: store._id },
        {
          $set: {
            name: req.body.name,
            user: req.body.userId,
            category: req.body.categoryId,
            description: req.body.description,
            location: req.body.location,
            contact: req.body.contact,
            openingHours: req.body.openingHours,
            keyword: req.body.keyword,
            backgroundImage: req.body.backgroundImage,
            mainImage: req.body.mainImage,
            likes: req.body.likes,
          },
        },
        { new: true }
      )
      .update("users", { _id: user._id }, { $set: { store: store } })
      .update(
        "categories",
        { _id: category._id },
        { $set: { "stores.$[elem]": store } },
        { arrayFilters: [{ "elem._id": { $eq: req.params.id } }] }
      )
      .run();
    res.send(store);
  } catch (ex) {
    console.log(ex);
    res
      .status(500)
      .send("Error occured, thus the user was not updated successfully.");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  try {
    new Fawn.Task()
      .remove("stores", { _id: store._id })
      .update(
        "categories",
        { _id: store.category._id },
        {
          $pull: { stores: store },
        }
      )
      .update("users", { _id: store.user._id }, { $unset: { store: "" } })
      .run();

    res.send(store);
  } catch (ex) {
    res
      .status(500)
      .send("Error occured, thus the store was not deleted successfully.");
  }
});

module.exports = router;

const { Store, validate } = require("../models/store");
const { Category } = require("../models/category");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Fawn = require("fawn");
const config = require("config");
const express = require("express");
const { urlencoded } = require("body-parser");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  stores = await Store.find().sort("name");
  if (!stores) return res.status.send(400).send("None exists.");
  res.send(stores);
});

router.get("/:id", async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

router.get("/search/:keyword", async (req, res) => {
  const stores = await Store.find({
    $or: [
      { name: req.params.keyword },
      { menus: { $elemMatch: { name: req.params.keyword } } },
    ],
  });
  if (!stores) return res.status.send(400).send("None exists.");
  res.send(stores);
});

router.post(
  "/",
  auth,
  // upload.array("images", config.get("maxImageCount")),
  async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    //find another way to validate the request body

    let store = await Store.findOne({ name: req.body.name }); //TODO: later change to userId
    if (store) return res.status(400).send("Store already registered.");

    const category = await Category.findById(req.body.category._id);
    if (!category) return res.status(400).send("Invalid category.");

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Invalid user.");

    store = new Store({
      name: req.body.name,
      category: {
        _id: category._id,
        label: category.label,
      },
      description: req.body.description,
      delivery: req.body.delivery,
      location: req.body.location,
      contact: req.body.contact,
      openingHours: req.body.openingHours,
      backgroundImage: req.body.backgroundImage,
      mainImage: req.body.mainImage,
      menus: req.body.menus,
    });

    console.log("useId", req.user._id);

    try {
      new Fawn.Task()
        .save("stores", store)
        .update("users", { _id: user._id }, { $addToSet: { stores: store } })
        .update(
          "categories",
          { _id: category._id },
          {
            $addToSet: { stores: store },
          }
        )
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
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  console.log("put res", req.body);

  const store = await Store.findById(req.params.id);
  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  const update = {
    _id: store._id,
    name: req.body.name,
    category: {
      _id: req.body.category._id,
      label: req.body.category.label,
    },
    description: req.body.description,
    delivery: req.body.delivery,
    location: req.body.location,
    contact: req.body.contact,
    openingHours: req.body.openingHours,
    backgroundImage: req.body.backgroundImage,
    mainImage: req.body.mainImage,
    menus: req.body.menus,
  };

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        "stores.$[elem].name": update.name,
        "stores.$[elem].category": {
          _id: update.category._id,
          label: update.category.label,
        },
        "stores.$[elem].description": update.description,
        "stores.$[elem].location": update.location,
        "stores.$[elem].contact": update.contact,
        "stores.$[elem].openingHours": update.openingHours,
        "stores.$[elem].delivery": update.delivery,
        "stores.$[elem].backgroundImage": update.backgroundImage,
        "stores.$[elem].mainImage": update.mainImage,
        "stores.$[elem].menus": update.menus,
      },
    },
    { arrayFilters: [{ "elem._id": update._id }] }
  );
  if (!user) return res.status(400).send("Invalid user.");

  const category = await Category.findByIdAndUpdate(
    update.category._id,
    {
      $set: {
        "stores.$[elem].name": update.name,
        "stores.$[elem].category": {
          _id: update.category._id,
          label: update.category.label,
        },
        "stores.$[elem].description": update.description,
        "stores.$[elem].location": update.location,
        "stores.$[elem].contact": update.contact,
        "stores.$[elem].openingHours": update.openingHours,
        "stores.$[elem].delivery": update.delivery,
        "stores.$[elem].backgroundImage": update.backgroundImage,
        "stores.$[elem].mainImage": update.mainImage,
        "stores.$[elem].menus": update.menus,
      },
    },
    { arrayFilters: [{ "elem._id": update._id }] }
  );
  if (!category) return res.status(400).send("Invalid category.");

  try {
    new Fawn.Task()
      .update(
        "stores",
        { _id: store._id },
        {
          $set: update,
        }
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
  console.log("welcome deleting");
  const store = await Store.findById(req.params.id);
  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: { stores: { _id: store._id } },
  });

  const category = await Category.findByIdAndUpdate(store.category._id, {
    $pull: { stores: { _id: store._id } },
  });

  try {
    new Fawn.Task().remove("stores", { _id: store._id }).run();
    res.send(store);
  } catch (ex) {
    res
      .status(500)
      .send("Error occured, thus the store was not deleted successfully.");
  }
});

module.exports = router;

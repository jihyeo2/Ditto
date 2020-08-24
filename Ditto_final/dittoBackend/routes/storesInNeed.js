const { StoreInNeed, validate } = require("../models/storeInNeed");
const express = require("express");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const storesInNeed = await StoreInNeed.find();
  res.send(storesInNeed);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("here");

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  console.log("there", category);

  const storeInNeed = new StoreInNeed({
    name: req.body.name,
    category: {
      _id: category._id,
      label: category.label,
    },
    contact: req.body.contact,
    location: req.body.location,
  });
  await storeInNeed.save();
  res.send(storeInNeed);
});

router.put("/:id", auth, async (req, res) => {
  console.log(req.body);
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Invalid user.");

  let storeInNeed = null;
  if (req.body.signUp) {
    storeInNeed = await StoreInNeed.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        users: user,
      },
    });
    if (!storeInNeed) return res.status(400).send("Invalid storeInNeed.");
  } else {
    storeInNeed = await StoreInNeed.findByIdAndUpdate(req.params.id, {
      $pull: {
        users: { _id: user._id },
      },
    });
    if (!storeInNeed) return res.status(400).send("Invalid storeInNeed.");
  }

  res.send(storeInNeed);
});

module.exports = router;

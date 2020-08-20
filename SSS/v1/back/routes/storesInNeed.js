const { StoreInNeed, validate } = require("../models/storeInNeed");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

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

  console.log("there");

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

module.exports = router;

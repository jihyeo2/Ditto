const { Category, validate } = require("../models/category");
const express = require("express");
const { Store } = require("../models/store");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

//post request written just for testing

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    label: req.body.label,
    imageUri: req.body.imageUri,
  });
  await category.save();
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;

const { Category, validate } = require("../models/category");
const express = require("express");
const { Store } = require("../models/store");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const category = new Category({
//     label: req.body.label,
//     icon: req.body.icon,
//   });
//   await category.save();
//   res.send(category);
// });

router.get("/:id", async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store)
    return res.status(404).send("The store with the given ID was not found.");

  res.send(store);
});

module.exports = router;

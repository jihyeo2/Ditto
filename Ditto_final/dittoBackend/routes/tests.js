const { Test, validate } = require("../models/test");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, (req, res) => {
  console.log("got it");
  const test = { name: "sdfgh" };
  res.send(test.name);
  console.log(test);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const test = new Test({
    name: req.body.name,
  });

  await test.save();
  res.send(test);
});

module.exports = router;

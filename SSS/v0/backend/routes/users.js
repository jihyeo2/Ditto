const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const Fawn = require("fawn");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const { Category } = require("../models/category");
const { Store } = require("../models/store");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user.name);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

/*
put request should be done in the following manner: 
all values that have not changed should also be passed. If not passed, an error rises
*/

router.put("/me", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  if (req.body.store == undefined || !req.body.store)
    req.body.store = user.store;

  const salt = await bcrypt.genSalt(10);
  const new_password = await bcrypt.hash(req.body.password, salt);

  try {
    new Fawn.Task()
      .update(
        "users",
        { _id: user._id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: new_password,
            store: req.body.store,
          },
        },
        { new: true }
      )
      .update(
        "stores",
        { _id: req.body.store._id },
        {
          $set: { user: user },
        }
      )
      .run();

    res.send(_.pick(user, ["_id", "name", "email"]));
    //Issue: {new: true} from update() does not work/ yet not covered auth transferral btw volunteers
  } catch (ex) {
    console.log(ex);
    res
      .status(500)
      .send("Error occured, thus the user was not updated successfully.");
  }
});

router.delete("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  if (user.store) {
    const store = await Store.findById(user.store._id);
    if (!store) return res.status(400).send("Invalid store.");

    const category = await Category.findById(store.category._id);
    if (!category) return res.status(400).send("Invalid category.");

    try {
      new Fawn.Task()
        .remove("users", { _id: user._id })
        .remove("stores", { _id: store._id })
        .update(
          "categories",
          { _id: category._id },
          { $pull: { stores: store } }
        )
        .run();
      res.send(user);
    } catch (ex) {
      console.log(ex);
      res
        .status(500)
        .send("Error occured, thus the user was not deleted successfully.");
    }
  }
  await user.remove();
  res.send(user);
});

module.exports = router;

// install joi-password-complexity to require more complex password to the users

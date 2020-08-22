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

  user = new User(
    _.pick(req.body, ["profileImage", "name", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "profileImage", "name", "email"]));
});

router.put("/me", auth, async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  console.log("req body", req.body);

  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  console.log("user pw", user);
  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );
  if (!validPassword) {
    console.log("not yet");
    return res.status(400).send("Invalid password");
  }

  console.log("here?");

  const salt = await bcrypt.genSalt(10);
  const new_password = await bcrypt.hash(req.body.password, salt);

  try {
    new Fawn.Task()
      .update(
        "users",
        { _id: user._id },
        {
          $set: {
            profileImage: req.body.profileImage,
            name: req.body.name,
            email: req.body.email,
            password: new_password,
          },
        },
        { new: true }
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
  console.log("welcome delteing users");
  const user = await User.findById(req.user._id).select(
    "-password -__v -profileImage"
  );
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  try {
    new Fawn.Task().remove("users", { _id: user._id }).run();
    res.send(user);
  } catch (ex) {
    res
      .status(500)
      .send("Error occured, thus the user was not deleted successfully.");
  }
});

module.exports = router;

// install joi-password-complexity to require more complex password to the users

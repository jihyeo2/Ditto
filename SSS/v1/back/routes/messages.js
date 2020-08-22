const { Message, validate } = require("../models/message");
const { Expo } = require("expo-server-sdk");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const sendPushNotification = require("../utilities/pushNotifications");

router.get("/", auth, async (req, res) => {
  const message = await Message.find({ userId: req.user._id });

  if (!message)
    return res.status(404).send("The message with the given ID was not found.");

  res.send(message);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log("body", req.body);

  const message = new Message({
    title: req.body.title,
    body: req.body.body,
    userId: req.body.userId,
  });

  console.log(message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid category.");
  console.log("haha", user);

  if (Expo.isExpoPushToken(user.expoPushToken)) {
    console.log("message sent!");
    await sendPushNotification(user.expoPushToken, message);
  }

  console.log("just passed");

  await message.save();

  res.send(message);
});

router.delete("/:id", async (req, res) => {
  const message = await Message.findOneAndRemove({ _id: req.params.id });
  res.send(message);
});

module.exports = router;

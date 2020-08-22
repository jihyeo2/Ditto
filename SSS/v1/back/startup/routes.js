const express = require("express");
const categories = require("../routes/categories");
const stores = require("../routes/stores");
const storesInNeed = require("../routes/storesInNeed");
const users = require("../routes/users");
const auth = require("../routes/auth");
const expoPushTokens = require("../routes/expoPushTokens");
const message = require("../routes/messages");
const tests = require("../routes/tests");

module.exports = function (app) {
  app.use(express.static("public"));
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/stores", stores);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/storesInNeed", storesInNeed);
  app.use("/api/expoPushTokens", expoPushTokens);
  app.use("/api/messages", message);
  app.use("/api/tests", tests);
};

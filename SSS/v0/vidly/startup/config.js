const config = require("config");
const winston = require("winston-mongodb");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined."); // throw 'somestring' --> will not show up on the stack trace
  }
};

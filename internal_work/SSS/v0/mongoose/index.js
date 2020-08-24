const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

// //exceptions out of express bound (works only for synchronous work)
// process.on("uncaughtException", (ex) => {
//   //addListener
//   winston.error(ex.message, ex);
//   process.exit(1); //anything but zero === failure
// });

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;

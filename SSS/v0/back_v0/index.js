const express = require("express");
const config = require("config");
const app = express();

require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/validation")();
require("./startup/prod")(app);

app.use(helmet());
app.use(compression());

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;

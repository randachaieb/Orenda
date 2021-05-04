require("dotenv").config({ path: "./server/config/.env" });
const debug = require("debug")("app:startup");
const express = require("express");

const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/validation")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  debug(`Server is listen on port ${PORT} on ${process.env.NODE_ENV} mode`)
);

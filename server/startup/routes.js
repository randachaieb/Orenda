const cors = require("cors");
const error = require("../middleware/error");
const express = require("express");
const fileUploader = require("express-fileupload");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const auth = require("../routes/api/auth");
const card = require("../routes/api/card");
const user = require("../routes/api/user");

module.exports = (app) => {
  app.use("/static", express.static(path.join(__dirname, "..", "public")));
  app.use(cors());
  app.use(error);
  app.use(express.json());
  app.use(fileUploader()); // File uploader middleware
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use("/api/v1/user", user);
  app.use("/api/v1/card", card);
  app.use("/api/v1/auth", auth);
};

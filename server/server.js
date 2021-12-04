require("dotenv").config({ path: "./server/config/.env" });
const debug = require("debug")("app:startup");
const express = require("express");
const path = require("path");

const app = express();
require("./startup/logging");
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/validation")();

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "client", "index.html"));
});
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "admin", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  debug(`Server is listen on port ${PORT} on ${process.env.NODE_ENV} mode`)
);

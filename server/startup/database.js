const mongoose = require("mongoose");
const logger = require("./logging");
const debug = require("debug")("app:startup");

debug(`MONGO_URI : ${process.env.MONGO_URI}`);

module.exports = function () {
  const dbURI = process.env.MONGO_URI;

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () =>
    logger.info(`mongoose is connected to ${dbURI}`)
  );

  mongoose.connection.on("error", (err) =>
    debug(`Error connecting to db ${err}`)
  );

  mongoose.connection.on("disconnected", () => {
    debug(`Mongoose is disconnected`);
  });

  process.on("SIGINT", () => {
    debug("Mongoose disconnected on exit process");
    process.exit(0);
  });
};

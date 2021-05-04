const winston = require("winston");
require("express-async-errors");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File({ filename: "server/logfile.log" }),
    new winston.transports.Console(),
  ],
});

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;

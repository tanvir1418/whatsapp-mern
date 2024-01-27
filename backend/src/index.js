const { error } = require("winston");
const app = require("./app");
const logger = require("./configs/logger.config");

// .env variables
const PORT = process.env.PORT || 8000;

// console.log(process.env.NODE_ENV);

let server;
server = app.listen(PORT, () => {
  logger.info(`Server is running at: http://localhost:${PORT}`);
  console.log("Process ID", process.pid);
  // throw new Error("Error in server");
});

// handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = () => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});

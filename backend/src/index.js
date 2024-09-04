const { error } = require("winston");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./configs/logger.config");

const SocketServer = require("./SocketServer");

// .env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

// console.log(process.env.NODE_ENV);

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

// mongodb debug mode
// if (process.env.NODE_ENV !== "production") {
//   mongoose.set("debug", true);
// }

// mongodb connection
// mongoose.connect(DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(DATABASE_URL).then(() => {
  logger.info("Connected to MongoDB");
});

let server;
server = app.listen(PORT, () => {
  logger.info(`Server is running at: http://localhost:${PORT}`);
  console.log("Process ID", process.pid);
  // throw new Error("Error in server");
});

// socket.io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

io.on("connection", (socket) => {
  logger.info(`Socket io connected successfully`);
  SocketServer(socket, io);
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

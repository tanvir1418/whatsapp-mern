const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const createHttpError = require("http-errors");
const routes = require("./routes/index");

// dotenv config
dotenv.config();

// create express app
const app = express();

// morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}

// helmet
app.use(helmet());

// parse json request url
app.use(express.json());

// parse json request url
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload
app.use(fileUpload({ useTempFiles: true }));

// cors
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// api v1 routes
app.use("/api/v1", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});

// error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;

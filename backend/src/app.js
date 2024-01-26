const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/test", (req, res) => {
  res.send(req.body);
});

module.exports = app;

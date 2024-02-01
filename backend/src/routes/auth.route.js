const express = require("express");
const trimRequest = require("trim-request");

const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshToken);

module.exports = router;

const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendMessage, getMessages } = require("../controllers/message.controller");

const router = express.Router();

router.route("/").post(trimRequest.all, authMiddleware, sendMessage);
router.route("/:convo_id").get(trimRequest.all, authMiddleware, getMessages);

module.exports = router;

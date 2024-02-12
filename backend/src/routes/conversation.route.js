const express = require("express");
const trimRequest = require("trim-request");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  create_open_conversation,
  getConversation,
} = require("../controllers/conversation.controller");

const router = express.Router();

router
  .route("/")
  .post(trimRequest.all, authMiddleware, create_open_conversation);
router.route("/").get(trimRequest.all, authMiddleware, getConversation);

module.exports = router;

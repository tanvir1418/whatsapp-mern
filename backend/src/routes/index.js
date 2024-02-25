const express = require("express");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const ConversationRoutes = require("./conversation.route");
const MessageRoutes = require("./message.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/conversation", ConversationRoutes);
router.use("/message", MessageRoutes);

module.exports = router;

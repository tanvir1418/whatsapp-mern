const createHttpError = require("http-errors");
const logger = require("../configs/logger.config");
const {
  doesConversationExist,
  createConversation,
  populateConversation,
  getUserConversations,
} = require("../services/conversation.service");

const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;
    const { receiver_id, isGroup } = req.body;

    if (isGroup === false) {
      // check if receiver_id is provided
      if (!receiver_id) {
        logger.error(
          "Please provide the user id you wanna start a conversation with"
        );
        throw createHttpError.BadGateway("Something went wrong!");
      }

      // check if chat exists
      const existed_conversation = await doesConversationExist(
        sender_id,
        receiver_id,
        false
      );

      if (existed_conversation) {
        res.status(200).json(existed_conversation);
      } else {
        let convoData = {
          name: "conversation name",
          picture: "conversation picture",
          isGroup: false,
          users: [sender_id, receiver_id],
        };
        const newConvo = await createConversation(convoData);
        const populatedConvo = await populateConversation(
          newConvo._id,
          "users",
          "-password"
        );
        res.status(200).json(populatedConvo);
      }
    } else {
      // its a group chat
      // check if chat exists
      const existed_group_conversation = await doesConversationExist(
        "",
        "",
        isGroup
      );
      res.status(200).json(existed_group_conversation);
    }
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};

const createGroup = async (req, res, next) => {
  const { name, users } = req.body;
  // add current user to users
  users.push(req.user.userId);
  if (!name || !users) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }
  if (users.length < 2) {
    throw createHttpError.BadRequest(
      "At least 2 users are required to start a group chat."
    );
  }
  let convoData = {
    name,
    users,
    isGroup: true,
    admin: req.user.userId,
    picture: process.env.DEFAULT_GROUP_PICTURE,
  };
  try {
    const newConvo = await createConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users admin",
      "-password"
    );
    res.status(200).json(populatedConvo);
  } catch (error) {
    next(error);
  }
};

module.exports = { create_open_conversation, getConversation, createGroup };

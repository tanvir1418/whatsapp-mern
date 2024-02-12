const createHttpError = require("http-errors");
const { MessageModel } = require("../models");

const createMessage = async (data) => {
  const newMessage = await MessageModel.create(data);
  if (!newMessage) {
    throw createHttpError.BadRequest("Oops...Something went wrong");
  }
  return newMessage;
};

const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });

  if (!msg) {
    throw createHttpError.BadRequest("Oops...Something went wrong");
  }

  return msg;
};

const getConvoMessages = async (convo_id) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "name picture email status")
    .populate("conversation");

  if (!messages) {
    throw createHttpError.BadRequest("Oops...Something went wrong");
  }
  return messages;
};

module.exports = {
  createMessage,
  populateMessage,
  getConvoMessages,
};

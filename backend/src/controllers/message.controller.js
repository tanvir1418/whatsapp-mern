const logger = require("../configs/logger.config");
const { updateLatestMessage } = require("../services/conversation.service");
const {
  createMessage,
  populateMessage,
  getConvoMessages,
} = require("../services/message.service");

const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, convo_id, files } = req.body;

    if (!convo_id || (!message && !files)) {
      logger.error("Please provide a conversation id and a message body");
      return res.sendStatus(400);
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);

    await updateLatestMessage(convo_id, newMessage);

    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      logger.error("Please add a conversation id in params");
      return res.sendStatus(400);
    }

    const messages = await getConvoMessages(convo_id);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getMessages };

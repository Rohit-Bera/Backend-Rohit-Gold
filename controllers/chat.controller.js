const Chatlist = require("../models/chatModel");

//post message for user
const postMesage = async (request, response) => {
  try {
    const newMessage = new Chatlist(request.body);

    const saveMessage = await newMessage.save();

    response.status(200).json(saveMessage);
  } catch (e) {
    console.log("e: ", e);

    return response.json({
      status: 500,
      isFail: false,
      error: "Internal server error",
    });
  }
};

//get

const getMessages = async (request, response) => {
  try {
    const messages = await Chatlist.find({
      conversationId: request.params.conversationId,
    });

    response.status(200).json(messages);
  } catch (e) {
    console.log("e: ", e);

    return response.json({
      status: 500,
      isFail: false,
      error: "Internal server error",
    });
  }
};

module.exports = { postMesage, getMessages };

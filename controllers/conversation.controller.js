const Conversationlist = require("../models/conversationModel");

//new conv

//post
const newConversation = async (request, response) => {
  try {
    console.log("request.body.senderId: ", request.body.senderId);
    console.log("request.body.receiverId: ", request.body.receiverId);
    if (
      request.body.senderId === undefined ||
      request.body.receiverId === undefined
    ) {
      return response.json({
        status: 404,
        isSuccess: false,
        error: "Users not found",
      });
    }

    const handleConversation = new Conversationlist({
      members: [request.body.senderId, request.body.receiverId],
    });

    const saveConversation = await handleConversation.save();

    response.status(200).json(saveConversation);
  } catch (e) {
    console.log("e: ", e);

    return response.json({
      status: 500,
      isFail: false,
      error: "Internal server error",
    });
  }
};

//get conv of a user (returns conversation of a user using ID);

const getConversation = async (request, response) => {
  try {
    if (request.params.userId === null) {
      return response.json({
        status: 404,
        isSuccess: false,
        error: "Users not found",
      });
    }

    const handlegetConversation = await Conversationlist.find({
      members: { $in: [request.params.userId] },
    });

    response.status(200).json(handlegetConversation);
  } catch (e) {
    console.log("e: ", e);

    return response.json({
      status: 500,
      isFail: false,
      error: "Internal server error",
    });
  }
};

module.exports = { newConversation, getConversation };

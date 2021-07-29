const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//message.js

const chatSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chatlist = mongoose.model("Chatlist", chatSchema);

module.exports = Chatlist;

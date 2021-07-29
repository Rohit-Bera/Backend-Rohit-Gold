const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
      // just members , conversationID
    },
  },
  { timestamps: true }
);

const Conversationlist = mongoose.model("Conversationlist", conversationSchema);

module.exports = Conversationlist;

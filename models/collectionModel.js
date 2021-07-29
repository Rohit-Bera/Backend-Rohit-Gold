const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    imgofCollection: {
      type: String,
      require: true,
    },
    nameofCollection: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishSchema);

module.exports = Wishlist;

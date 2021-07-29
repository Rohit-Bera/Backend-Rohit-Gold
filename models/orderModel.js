const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    delieveryStatus: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

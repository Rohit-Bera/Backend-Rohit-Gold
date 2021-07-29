const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    availableStatus: {
      type: Boolean,
      require: true,
      default: false,
    },
    productImage: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    purity: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

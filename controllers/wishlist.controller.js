const Wishlist = require("../models/wishlistModel");
const { request, response } = require("express");

const addToWish = async (request, response) => {
  try {
    const { productId } = request.query;
    console.log("productId: ", productId);
    const user = request.user;
    console.log("user: ", user);
    const _id = user._id;

    const exist = await Wishlist.findOne({ product: productId });

    if (exist) {
      return response.json({
        error: "product already exist in wishlist",
        status: 302,
      });
    }

    const like = new Wishlist({ product: productId, owner: { _id } });

    console.log("like: ", like);

    await like.save();

    response
      .status(200)
      .json({ success: "Added to myWishlist", status: 200, like });
  } catch (e) {
    console.log("error: ", e);

    return response.status(500).json({ error: "There is some error." });
  }
};

const myWishlist = async (request, response) => {
  try {
    const user = request.user;
    const _id = user._id;

    const like = await Wishlist.find({ owner: _id })
      .populate("owner")
      .populate("product");

    response.json({ success: "isuccessfull", like, status: 200 });
  } catch (error) {
    console.log("error: ", error);

    return response.status(401).json({ error: "There is some error." });
  }
};

const removeFromList = async (request, response) => {
  const _id = request.params.id;
  try {
    const exist = await Wishlist.findByIdAndDelete({ _id });

    if (!exist) {
      return response.json({
        error: "Product not found in whishlist. ",
        status: 404,
      });
    }

    response.json({
      success: "product has been removed successfully..",
      status: 200,
    });
  } catch (error) {
    console.log("error: ", error);

    return response.status(401).json({ error: "There is some error." });
  }
};

module.exports = { addToWish, myWishlist, removeFromList };

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  addToWish,
  myWishlist,
  removeFromList,
} = require("../controllers/wishlist.controller");

router.post("/addtowishlist", auth, addToWish);
router.get("/mywishlist", auth, myWishlist);
router.delete("/removefromlist/:id", auth, removeFromList);

module.exports = router;

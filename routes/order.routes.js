const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  placeOrder,
  myOrders,
  cancelOrder,
  allOrder,
  updateOrder,
} = require("../controllers/order.controller");
const admincheck = require("../middlewares/admincheck");

router.get("/myorders", auth, myOrders);
router.post("/placeorder", auth, placeOrder);
router.delete("/cancelorder/:id", auth, cancelOrder);
router.get("/allorder", auth, admincheck, allOrder);
router.put("/updateorder/:id", auth, admincheck, updateOrder);

module.exports = router;

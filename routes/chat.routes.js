const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admincheck = require("../middlewares/admincheck");

const { postMesage, getMessages } = require("../controllers/chat.controller");

//user
router.post("/postMessageforUser", auth, postMesage);

//gets all chat from admin through particular conversationID to user;
router.get("/getMessagesforUser/:conversationId", auth, getMessages);

//admin
router.post("/postMessageforAdmin", auth, admincheck, postMesage);

//gets all chat from users through particular conversationID to admin;
router.get(
  "/getMessagesforAdmin/:conversationId",
  auth,
  admincheck,
  getMessages
);

module.exports = router;

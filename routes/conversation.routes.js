const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admincheck = require("../middlewares/admincheck");

const {
  newConversation,
  getConversation,
} = require("../controllers/conversation.controller");

//user
router.post("/postConversation", auth, newConversation);
router.get("/getConversation/:userId", auth, getConversation);

//admin
router.post("/ConversationforAdmin", auth, admincheck, newConversation);
router.get(
  "/getConversationforAdmin/:userId",
  auth,
  admincheck,
  getConversation
);

module.exports = router;

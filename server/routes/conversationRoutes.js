const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getConversation,
} = require("../controllers/conversationController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").post(auth, sendMessage).get(auth, getConversation);

module.exports = router;

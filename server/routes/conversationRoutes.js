const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getConversation,
  getConversationPreviews,
  contact,
} = require("../controllers/conversationController");
const { auth } = require("../middlewares/authMiddlewares");

router.route("/").post(auth, sendMessage);

router.route("/previews").get(auth, getConversationPreviews);

router.route("/contact").post(auth, contact);

router.route("/:userId").get(auth, getConversation);

module.exports = router;

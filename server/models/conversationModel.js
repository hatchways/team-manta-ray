const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      content: {
        type: String,
        max: 500, //Max 500 characters
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: { type: Date },
    },
  ],
  lastMessage: {
    content: {
      type: String,
      max: 500, //Max 500 characters
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: { type: Date },
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;

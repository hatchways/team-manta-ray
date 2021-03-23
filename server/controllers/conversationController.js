const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");

//Body of the request should have the id of the recipient, and a message
const sendMessage = async (req, res) => {
  try {
    const { recipient, message } = req.body;

    //Check if recipient exists
    const recipientUser = await User.findById(recipient);
    if (!recipientUser) throw new Error("That recipient doesn't exist");

    //Check if sender is not the recipient
    if (req.user._id === recipient)
      throw new Error("You can't send a message to yourself");

    //Get conversation
    const conversation = await Conversation.find({
      participants: { $all: [req.user._id, recipient] },
    });

    //If this conversation doesn't exist, create one
    if (!conversation) {
      const newConversation = await new Conversation({
        participants: [req.user._id, recipient],
        messages: [],
      });

      await newConversation.save();
    }

    //Add the new message to the conversation document
    await Conversation.findOneAndUpdate(
      {
        participants: { $all: [req.user._id, recipient] },
      },
      {
        $push: {
          messages: {
            content: message,
            sender: req.user._id,
            createdAt: Date.now(),
          },
        },
      }
    );

    //Return a response
    return res.status(200).json({
      success: true,
      recipient: recipient,
      messageSent: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getConversation = async (req, res) => {
  try {
    const recipient = req.body.recipient;

    const conversation = await Conversation.find({
      participants: { $all: [req.user._id, recipient] },
    });

    if (!conversation) throw new Error("That conversation doesn't exist");

    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { sendMessage, getConversation };

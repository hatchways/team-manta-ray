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
    if (conversation.length === 0) {
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
        lastMessage: {
          content: message,
          sender: req.user._id,
          createdAt: Date.now(),
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
    const chattingWithId = req.params.userId;
    const userId = req.user._id;
    const conversation = await Conversation.find({
      participants: { $all: [userId, chattingWithId] },
    });

    if (!conversation) throw new Error("That conversation doesn't exist");

    const data = { ...conversation };

    if (String(data[0].participants[0]) === String(userId)) {
      data.chattingWith = await User.findById(data[0].participants[1]);
    } else {
      data.chattingWith = await User.findById(data[0].participants[0]);
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getConversationPreviews = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    }).select("-messages");

    const conversationPreviews = [];

    //Fill in chattingWidth data from your perspective
    for (convo of conversations) {
      //If you are the first element in the participants array, fill the data with the second participant
      if (String(convo.participants[0]) === String(userId)) {
        const chattingWith = await User.findById(convo.participants[1]).select(
          "-email -password -createdAt -updatedAt -cuisines -stripeCustomer -bio"
        );
        conversationPreviews.push({
          ...convo._doc,
          chattingWith,
        });
        //If you are the second element in the participants array, fill the data with the first participant
      } else {
        const chattingWith = await User.findById(convo.participants[0]).select(
          "-email -password -createdAt -updatedAt -cuisines -stripeCustomer -bio"
        );
        conversationPreviews.push({
          ...convo._doc,
          chattingWith,
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: conversationPreviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const contact = async (req, res) => {
  try {
    const recipient = req.body.recipient;
    const userId = req.user._id;
    const conversation = await Conversation.find({
      participants: { $all: [userId, recipient] },
    });

    if (conversation.length === 0) {
      console.log("MADE IT HERE");
      const newConversation = await new Conversation({
        participants: [userId, recipient],
        messages: [],
        lastMessage: {
          content: "",
          sender: userId,
          createdAt: Date.now(),
        },
      });
      await newConversation.save();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getConversationPreviews,
  contact,
};

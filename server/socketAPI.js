const socketIo = require("socket.io");
const io = socketIo();
const socketApi = {};
const { v4: uuidv4 } = require("uuid");

const Conversation = require("./models/conversationModel");

const { socketAuth } = require("./middlewares/socketAuthMiddleware");

socketApi.io = io;

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(socketAuth));

//Add the message to the conversation in the database
const sendMessageToDatabase = async (recipient, sender, content) => {
  await Conversation.findOneAndUpdate(
    {
      participants: { $all: [sender, recipient] },
    },
    {
      $push: {
        messages: {
          content,
          sender,
          createdAt: Date.now(),
        },
      },
      lastMessage: {
        content,
        sender,
        createdAt: Date.now(),
      },
    }
  );
};

//Socket logic here
io.on("connection", (socket) => {
  const user = socket.request.user;
  const id = socket.handshake.query.id;
  socket.join(id);
  socket.on("send-message", ({ recipient, content }) => {
    socket.broadcast.to(recipient).emit("receive-message", {
      sender: id,
      content,
    });
    socket.broadcast.to(id).emit("receive-message", {
      sender: id,
      content,
    });
    socket.broadcast.to(recipient).emit("notification", {
      _id: `${uuidv4()}`,
      type: "message",
      name: user.name,
      preview: content,
      link: `/chat/${id}`,
    });
    sendMessageToDatabase(recipient, id, content);
  });

  socket.on("test", (message) => {
    socket.emit("notification", {
      _id: "5",
      type: "message",
      name: "Jason Mills",
      preview: "Are you available this Saturday?",
      link: "/chat/535ab562df4471243d1431a",
    });
    console.log(message);
  });
  socket.on("disconnect", () => {
    console.log(user.name + " has disconnected");
  });
});

module.exports = { socketApi };

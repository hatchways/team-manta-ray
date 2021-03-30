const socketIo = require("socket.io");
const io = socketIo();
const socketApi = {};

const { socketAuth } = require("./middlewares/socketAuthMiddleware");

socketApi.io = io;

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(socketAuth));

const connectedUsers = [];
//Socket logic here
io.on("connection", (socket) => {
  const user = socket.request.user;
  console.log(socket.id);
  console.log(user.name + " has connected");
  connectedUsers.push(user);
  console.log("Currently connected users: \n" + connectedUsers);
  socket.id = user._id;
  console.log("Socket ID: " + socket.id);

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
    connectedUsers.splice(connectedUsers.indexOf(user), 1);
    console.log("Currently connected users:" + connectedUsers);
  });
});

module.exports = { socketApi, connectedUsers };

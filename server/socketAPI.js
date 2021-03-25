const socket_io = require("socket.io");
const io = socket_io();
const socketApi = {};

const { socketAuth } = require("./middlewares/socketAuthMiddleware");

socketApi.io = io;

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(socketAuth));

const connectedUsers = [];

io.on("connection", (socket) => {
  console.log("A user has connected");
});

module.exports = socketApi;

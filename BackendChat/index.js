const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("usuario se a unido al chat");

    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data, "mensaje");
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

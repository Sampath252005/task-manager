import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const users = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  //save user name from the frontend
  socket.on("register", (username) => {
    users.set(socket.id, username);
    console.log(`${username} connected`);
  });

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    const username = users.get(socket.id);
    io.to(roomName).emit("chatMessage", {
      user: "System",
      text: `${username} has joined ${roomName}`,
    });
  });

  socket.on("sendMessage", ({ room, message }) => {
    const username = users.get(socket.id);
    io.to(room).emit("chatMessage", {
      user: username,
      text: message,
    });
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    console.log(`${username} disconnected`);
    users.delete(socket.id);
  });
});

httpServer.listen(3001, () => {
  console.log("Socket.IO server running on http://localhost:3001");
});

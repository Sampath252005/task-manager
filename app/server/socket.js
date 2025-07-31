import { Server } from "socket.io";
/**
 * @param {http.Server} server - The HTTP server to bind Socket.IO
 */

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow your frontend to connect
      methods: ["GET", "POST"],
    },
  });

  // Handle connection events
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

  

socket.on("joinRoom", ({ roomName, userName }) => {
    socket.join(roomName); // Socket.IO joins room
    console.log(`${userName} joined room: ${roomName}`);

    // Broadcast to others in room
    socket.to(roomName).emit("userJoined", `${userName} has joined the room.`);
  });

  // When a user sends a message to a room
  socket.on("send_message", ({ roomName, message, userName }) => {
      const time = new Date().toLocaleTimeString();
    io.to(roomName).emit("receive_message", { message, userName,time });
  });

  socket.on("disconnect", () => {
    console.log("🚫 A user disconnected:", socket.id);
  });

  });
}

// Basic Express + Socket.IO server

import express from "express";
import http from "http";
import cors from "cors";
import { initializeSocket } from "./socket.js";

// Setup
const app = express();
const server = http.createServer(app);

// Enable CORS for frontend
app.use(cors());

// Initialize WebSocket
initializeSocket(server);

// Start server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running at http://localhost:${PORT}`);
});

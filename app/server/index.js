import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import cors from 'cors';

const app =express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

app.use(cors());
app.use(express.json());

const users= new Map();

io.on('connection',(socket)=>{
  console.log('A user connected:', socket.id);


})

httpServer.listen(3001, () => {
  console.log('Socket.IO server running on http://localhost:3001');
});
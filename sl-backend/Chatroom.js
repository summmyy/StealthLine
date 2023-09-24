const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:5173"}
});

// Enable CORS for all routes
const corsOptions = {
    origin: 'http://localhost:5173',
  };
  
app.use(cors(corsOptions));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle incoming messages from clients
  socket.on('message', (message) => {
    // Broadcast the message to all connected clients (including the sender)
    message.type = 'incoming';
    io.emit('message', message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
});

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
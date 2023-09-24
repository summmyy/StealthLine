const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:5173" }
});

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

const MAX_CONNECTIONS = 2; // Limit the chat room to two clients
let connectedClients = 0;

// Handle WebSocket connections
io.on('connection', (socket) => {
  if (connectedClients >= MAX_CONNECTIONS) {
    // Reject the connection if the limit is reached
    socket.emit('connectionRejected', 'The chat room is full. Try again later.');
    socket.disconnect(true);
  } else {
    // Allow the connection and increment the counter
    connectedClients++;
    console.log(`A user connected: ${socket.id}`);

    // Handle incoming messages from clients
    socket.on('message', (message) => {
      // Broadcast the message to all connected clients (including the sender)
      console.log(message);
      io.emit('message', message);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log(`A user disconnected: ${socket.id}`);
      // Decrement the counter when a client disconnects
      connectedClients--;
    });
  }
});

// Start the server
const port = process.env.PORT || 3002;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
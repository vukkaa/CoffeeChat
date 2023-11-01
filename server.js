const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static('public'));

// This is where you add the code for handling new user connections
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Emit a message to all clients to announce the new connection
  io.emit('chat message', 'A new user has joined the chat');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});

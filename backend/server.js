const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');
const handleChat = require('./chatHandler');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    handleChat(io, socket);
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

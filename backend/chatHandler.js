const messages = {};

function handleChat(io, socket) {
    socket.on('sendMessage', (data) => {
        if (!messages[socket.id]) messages[socket.id] = [];
        messages[socket.id].push({ message: data.message, time: new Date() });
        socket.emit('messageHistory', messages[socket.id]);
    });

    socket.on('getMessages', () => {
        socket.emit('messageHistory', messages[socket.id] || []);
    });
}

module.exports = handleChat;

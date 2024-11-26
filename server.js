const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let players = [];

server.on('connection', (socket) => {
    console.log('A player connected');
    players.push(socket);

    socket.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast the message to all connected players
        players.forEach((player) => {
            if (player !== socket && player.readyState === WebSocket.OPEN) {
                player.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('A player disconnected');
        players = players.filter((player) => player !== socket);
    });
});

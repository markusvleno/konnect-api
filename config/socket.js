const httpServer = require("./server").httpServer;
const socketio = require("socket.io");

const wss = new socketio.Server(httpServer, {
    path: "/sockets",
    serveClient: false,
    cookie: true,
    cors: {
        credentials: true,
    },
});

const chatSocket = wss.of("/chat");

module.exports = { wss, chatSocket };

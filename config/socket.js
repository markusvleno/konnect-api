const httpServer = require("./server").httpServer;
const socketio = require("socket.io");

const wss = new socketio.Server(httpServer, {
    path: "/sockets",
    serveClient: false,
    cookie: true,
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
    },
});

const chatSocket = wss.of("/chat");

module.exports = { wss, chatSocket };

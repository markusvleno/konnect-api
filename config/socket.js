const { server } = require("./server");
const socketio = require("socket.io");

const wss = new socketio.Server(server, {
    path: "/sockets",
    serveClient: false,
    cookie: true,
    cors: {
        credentials: true,
    },
});

const chatSocket = wss.of("/chat");

module.exports = { wss, chatSocket };

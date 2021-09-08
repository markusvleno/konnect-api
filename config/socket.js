const httpServer = require("./server").httpServer;
const socketio = require("socket.io");

// dev cors
const cors = {
    origin: ["http://localhost:3000"],
};

const wss = new socketio.Server(httpServer, {
    path: "/socket",
    serveClient: false,
    cookie: true,
    cors: cors,
});
console.log(wss.path());

// const chatSocket = wss.of("/chat");

module.exports = { wss };

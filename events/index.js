const mongoose = require("mongoose");
const httpServer = require("../config/server").httpServer;
const socket = require("socket.io");

const wss = new socket.Server(httpServer, {
    path: "/events",
    serveClient: true,
});

wss.on("connection", (socket) => {
    socket.emit("brah", { data: "brah" });
});

wss.on("brah", (msg) => {
    console.log(msg);
});

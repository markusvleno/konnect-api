const { wss, chatSocket } = require("../config/socket");
const { v4 } = require("uuid");
const UserModel = require("../model/users");
const { validateCookie } = require("../utils/cookie");

let connections = [];

chatSocket.on("connection", (skt) => {
    let { userId } = skt.handshake.query;

    if (!userId) skt.disconnect();
    connections.push({ socketId: skt.id, userId: userId });

    skt.on("send-message", (req, cb) => {
        const { _msgToSend } = req;

        const userSocketId = connections.filter((con) => {
            return con.userId === _msgToSend.sender.userId;
        });

        console.log(userSocketId);

        if (!userSocketId) {
            //abort event
            cb(false);
            return;
        }

        cb(true);
    });

    skt.on("disconnect", (reason) => {
        connections = connections.filter((con) => {
            return con.userId !== userId;
        });
    });
});

//default handler
wss.on("connection", (socket) => {
    console.log("brah");
    console.log(socket.id + " tried to connect :/ path");
    socket.disconnect(true);
});

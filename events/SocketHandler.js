const { wss, chatSocket } = require("../config/socket");

let connections = [];

chatSocket.on("connection", (skt) => {
    let { userId } = skt.handshake.query;

    if (!userId) skt.disconnect();
    connections.push({ socketId: skt.id, userId: userId });
    console.log(userId);

    skt.on("send-message", (req, cb) => {
        const { _msgToSend } = req;

        let destConnection = null;

        connections.forEach((con) => {
            if (con.userId === _msgToSend.receiver.userId) destConnection = con;
        });

        if (!destConnection) {
            //abort event
            cb(false);
            return;
        }

        chatSocket.to(destConnection.socketId).emit("receive-message", _msgToSend);

        cb(true); //success
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

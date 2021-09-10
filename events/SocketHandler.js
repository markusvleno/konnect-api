const { wss, chatSocket } = require("../config/socket");
const { v4 } = require("uuid");
const UserModel = require("../model/users");
const { validateCookie } = require("../utils/cookie");

let chatConnections = [];

chatSocket.on("connection", (socket) => {
    let { _token } = socket.request.headers.cookie;
    let { username } = socket.handshake.query;

    // if (!validateCookie(_token)) {
    //     socket.disconnect(true);
    //     return;
    // }

    console.log(socket.id);
    chatConnections.push({
        username,
        socketID: socket.id,
    });
});

//default handler
wss.on("connection", (socket) => {
    console.log("brah");
    console.log(socket.id + " tried to connect :/ path");
    socket.disconnect(true);
});

// export default class WebSockets {
//     public static wss: any;
//     public static connections = [];

//     static init(server: http.Server): void {
//         this.wss = new WebSocketServer({
//             httpServer: server,
//         });

//         this.wss.on("request", (request) => {
//             console.log("Websocket request received.");
//             let connection = request.accept(null, request.origin);
//             WebSockets.connections.push(connection);
//             let senderid = request.httpRequest.url.split("/")[2];
//             connection.userID = senderid;

//             connection.on("open", () => {
//                 console.log("Server socket Connection opened.");
//             });
//             connection.on("close", () => {
//                 console.log("Server socket Connection closed.");
//             });

//             connection.on("message", function (message: { utf8Data: string }) {
//                 let msgData = JSON.parse(message.utf8Data);
//                 // Create a new ID for new chat
//                 if (msgData.chatId === undefined) {
//                     msgData.chatId = uuid();
//                 }
//                 msgData.messageId = uuid();
//                 // Send message to Recipient Connection and the sender as well.
//                 WebSockets.connections.map((conn) => {
//                     if (conn.userID == msgData.receiverid || conn.userID == msgData.senderid) {
//                         conn.send(JSON.stringify(msgData));
//                     }
//                 });
//             });
//         });
//     }
// }

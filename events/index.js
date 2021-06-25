const mongoose = require("mongoose");
const socket = require("socket.io");
const app = require("express")();
const userdb = mongoose.connection.collection("users");

let changeStream;

(async () => {
    try {
        changeStream = userdb.watch();

        changeStream.on("change", (next) => {
            console.log(next);
        });
    } catch (error) {
        console.error(`\nError occoured @${Date.now()} : ${error}`);
    }
})();

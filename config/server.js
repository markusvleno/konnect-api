const app = require("express")();
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

let server;

if (process.env.NODE_ENV=="production") {
    server = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "..", "cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "..", "cert", "cert.pem")),
    },
    app,
);
} else {
    server = http.createServer(app);
}



module.exports = { app, server };

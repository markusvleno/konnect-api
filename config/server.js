const app = require("express")();
const http = require("http");
const https = require("https");
const httpServer = http.createServer(app);
const fs = require("fs");
const path = require("path");

let dr = path.join(__dirname, "..", "cert");
console.log(dr);

const httpsServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "..", "cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "..", "cert", "cert.pem")),
    },
    app,
);

module.exports = { app, httpServer, httpsServer };

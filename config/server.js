const app = require("express")();
const http = require("http");
const httpServer = http.createServer(app);

module.exports = { app, httpServer };

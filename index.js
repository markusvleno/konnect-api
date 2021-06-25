require("dotenv").config();
const express = require("express");
//const https = require("https");
//const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
//const app = express();

const app = require("./config/server").app;
const httpServer = require("./config/server").httpServer;

//view
app.use("/static", express.static("public", { dotfiles: "deny", etag: true }));

//db
require("./config/mongoDB");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

app.use(
    morgan("combined", {
        stream: fs.createWriteStream(path.join(__dirname, "log", "server.log"), { flags: "a" }),
    }),
);

app.use(
    cors({
        origin: "http://localhost",
        methods: "GET,POST",
        optionsSuccessStatus: 200,
    }),
);

//view engine
//app.engine("html", cons.swig);
//app.set("view engine", "html");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
const apisignup = require("./routes/api-signup");
app.use("/api/v1/signup", apisignup);

const apisignin = require("./routes/api-signin");
app.use("/api/v1/signin", apisignin);

const apiUsername = require("./routes/api-username");
app.use("/api/v1/username", apiUsername);

app.get("/protected", (req, res) => {
    res.status(200).send("protected route");
});

//entry point
app.get("/", (req, res) => {
    res.render("index");
});

//404 route
app.get("/404", (req, res) => {
    res.render("404");
});

app.get("/test", (req, res) => {
    res.render("test");
});

//server config
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;

//const serverHttp = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`server is up @http://localhost:${port}`);
});

/*
const serverHttps = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    },
    app,
);


serverHttps.listen(port, () => {
    console.log(`server is up @https://localhost:${port}`);
});

*/

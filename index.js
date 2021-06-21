require("dotenv").config();
const express = require("express");
//const https = require("https");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const cons = require("consolidate");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
const app = express();

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

//user middleware
const { authenticate } = require("./utils/auth");

//view engine
app.engine("html", cons.swig);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

//routes
const signup = require("./routes/route-signup");
app.use("/signup", signup);

const signin = require("./routes/route-signin");
app.use("/signin", signin);

const hasUsername = require("./routes/route-hasUsername");
app.use("/username", hasUsername);

app.get("/protected", authenticate, (req, res) => {
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

//server config
const port = process.env.PORT || 3000;

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => {
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

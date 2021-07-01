require("dotenv").config();
const express = require("express");
//const https = require("https");
//const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//const app = express();

const app = require("./config/server").app;
const httpServer = require("./config/server").httpServer;

//view
app.use("/static", express.static("public", { dotfiles: "deny", etag: true }));

//event
require("./events");

//db
require("./config/mongoDB");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
const store = new MongoDBStore({ uri: require("./config/mongoDB").DB_URL, collection: "session" });
app.use(
    session({
        name: "_token",
        secret: process.env.SECRET,
        store: store,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, secure: false },
    }),
);
app.use(
    morgan("combined", {
        stream: fs.createWriteStream(path.join(__dirname, "log", "server.log"), { flags: "a" }),
    }),
);
app.use(cors());
/*
app.use(
    cors({
        origin: "http://localhost",
        methods: "GET,POST",
        optionsSuccessStatus: 200,
    }),
);
*/

//view engine
app.set("views", path.join(__dirname, "views"));
//app.engine("html", cons.swig);
//app.set("view engine", "html");
app.set("view engine", "ejs");
//app.set("view engine", "jsx");
//app.engine("jsx", require("express-react-views").createEngine({ beautify: false, doctype: "<!DOCTYPE html>" }));

//routes
const { isLoggedIn, isNotLoggedIN } = require("./utils/authentication");

const apisignup = require("./routes/api-signup");
app.use("/api/v1/signup", apisignup);

const apisignin = require("./routes/api-signin");
app.use("/api/v1/signin", apisignin);

const apiUsername = require("./routes/api-username");
app.use("/api/v1/username", apiUsername);

app.get("/login", isLoggedIn, (req, res) => {
    res.render("login");
});

app.get("/protected", isNotLoggedIN, (req, res) => {
    res.status(200).send("protected route");
});

//entry point
app.get("/", (req, res) => {
    //res.render("index");
    res.send("hello");
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

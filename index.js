require("dotenv").config();
const express = require("express");
const https = require("https");
const cors = require("cors");
const morgan = require("morgan");
const cons = require("consolidate");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

//view
app.use("/static", express.static("public", { dotfiles: "deny", etag: true }));

//db
require("./config/mongoDB");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
const EXPRIRES = 1000 * 60 * 60 * 24;

const sessionStore = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: "sessions",
    expires: EXPRIRES,
    databaseName: "test",
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
});

sessionStore.on("error", function (error) {
    console.log(error);
});

app.use(
    session({
        name: "SessionID",
        secret: process.env.SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: EXPRIRES,
            httpOnly: false,
            secure: false,
        },
    }),
);
app.use(
    morgan("combined", {
        stream: fs.createWriteStream(path.join(__dirname, "log", "server.log"), { flags: "a" }),
    }),
);

app.use(
    cors({
        origin: "http://localhost:*",
        methods: "GET,POST",
        optionsSuccessStatus: 200,
    }),
);
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

//entry point
app.get("/", (req, res) => {
    console.log(req.session);
    res.send("good to go");
});

//404 route
app.get("*", (req, res) => {
    res.render("404");
});

//server config

const server = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    },
    app,
);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server is up @https://localhost:${port}`);
});

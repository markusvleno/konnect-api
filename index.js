require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up @http://localhost:${port}`);
});

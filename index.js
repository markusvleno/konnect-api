require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cookie_parser = require("cookie-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const { app, server } = require("./config/server");

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
app.use(cors());
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

if (process.env.NODE_ENV !== "production") {
    app.use(
        morgan("combined", {
            stream: fs.createWriteStream(path.join(__dirname, "log", "server.log"), { flags: "a" }),
        }),
    );
}

//view
app.set("views", path.join(__dirname, "views"));

//view engines

//app.engine("html", cons.swig);
//app.set("view engine", "html");
app.set("view engine", "ejs");
// app.set("view engine", "jsx");
// app.engine("jsx", require("express-react-views").createEngine({ beautify: false, doctype: "<!DOCTYPE html>" }));

//routes
const { isLoggedIn, isNotLoggedIN } = require("./utils/authentication");

const apisignup = require("./routes/api-signup");
app.use("/api/v1/signup", apisignup);

const apisignin = require("./routes/api-signin");
app.use("/api/v1/signin", apisignin);

const logout = require("./routes/api-logout");
app.use("/logout", logout);

const apiUsername = require("./routes/api-username");
app.use("/api/v1/username", apiUsername);

const apiUser = require("./routes/api-user");
app.use("/api/v1/user", apiUser);

const apiConfig = require("./routes/api-config");
app.use("/api/v1/config", apiConfig);

const bundle = require("./routes/api-bundle");
app.use("/api/v1/bundle", bundle);

app.get("/login", isLoggedIn, (req, res) => {
    res.render("login");
});

app.get("/app", isNotLoggedIN, (req, res) => {
    res.render("app");
});

//entry point
app.get("/", (req, res) => {
    res.redirect("/app");
});

//404 route
app.get("/404", (req, res) => {
    res.render("404");
});

app.get("/test", (req, res) => {
    res.send({
        user: {
            username: "Markus",
            name: "Makrus",
            profilePicture: "/static/assets/images/profile.svg",
            conversation: [],
        },
    });
});

//server config
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;

server.listen(port, () => {
    console.log(`server is up :${port}`);
});

const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mangoose = require("mongoose");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cookie_parser(process.env.SECRET));
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
    res.send("good to go");
});

//db connection
mangoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log("connected to db");
    })
    .catch((error) => {
        console.log("connection to db failed" + error);
    });

app.listen(port, () => {
    console.log(`server is up @http://localhost:${port}`);
});

const express = require("express");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
const mangoose = require("mongoose");
const app = express();
app.use(body_parser.json());
app.use(cookie_parser());

require("dotenv").config();
const port = process.env.PORT || 3000;

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

//routes

//entry point
app.get("/", (req, res) => {
    res.send("good to go");
});

app.listen(port, () => {
    console.log(`server is up @http://localhost:${port}`);
});

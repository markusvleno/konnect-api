const express = require("express");
const body_parser = require("body-parser");
const mangoose = require("mongoose");
const app = express();
app.use(body_parser.json());

require("dotenv").config();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("good to go");
});

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

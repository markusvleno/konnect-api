const mangoose = require("mongoose");

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

mangoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log("connected to db");
    })
    .catch((error) => {
        console.log("connection to db failed" + error);
    });

module.exports = { DB_URL, DB_NAME };

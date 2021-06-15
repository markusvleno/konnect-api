const mangoose = require("mongoose");

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

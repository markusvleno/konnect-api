const { Server } = require("socket.io");
const httpServer = require("../config/server").httpServer;
const MongoClient = require("mongodb").MongoClient;
try {
    (async () => {
        const mongo = new MongoClient(require("../config/mongoDB").DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await mongo.connect();

        let userStream = await mongo.db(require("../config/mongoDB").DB_NAME).collection("users").watch();
        let credentialStream = await mongo.db(require("../config/mongoDB").DB_NAME).collection("credentials").watch();

        userStream.on("change", (data) => {
            console.log(data);
        });

        credentialStream.on("change", (data) => {
            console.log(data);
        });
    })();
} catch (error) {
    console.log(error);
}

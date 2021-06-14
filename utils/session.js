const app = require("express")();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const EXPRIRES = 1000 * 60 * 60 * 24;

const sessionStore = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: "sessions",
    expires: EXPRIRES,
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
    },
});

sessionStore.on("error", function (error) {
    console.log(error);
});

app.use(
    session({
        name: "SessionID",
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: EXPRIRES,
        },
    }),
);

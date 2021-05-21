const mongoose = require("mongodb");
const { Schema } = require("mongoose");

const login = Schema({
    _id: Schema.Types.ObjectId,
    username: { type: Schema.Types.String, required: true, max: [20, "Max length is 20 characters"] },
    email: { type: Schema.Types.String, required: true },
    pwHash: { type: Schema.Types.String, required: true },
    pwSalt: { type: Schema.Types.String, required: true },
});

module.exports = mongoose.model("login", login);

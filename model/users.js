const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: { type: Schema.Types.String, required: true, max: [20, "Max length is 20 characters"] },
    name: { type: Schema.Types.String, require: true, max: [25, "Max length is 25 characters"] },
    accountCreated: Schema.Types.String,
    loginToken: Schema.Types.String,
});

module.exports = mongoose.model("users", userSchema);

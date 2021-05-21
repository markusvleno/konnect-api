const mongoose = require("mongodb");
const { Schema } = require("mongoose");

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username: { type: Schema.Types.String, required: true, max: [20, "Max length is 20 characters"] },
    name: {
        firstName: Schema.Types.String,
        lastName: Schema.Types.String,
    },
    email: { type: Schema.Types.String, required: true },
    accountCreated: Schema.Types.Date,
    profilePicture: Buffer,
    loggedIP: Schema.Types.Array,
    contact: Schema.Types.Number,
});

module.exports = mongoose.model("user", userSchema);

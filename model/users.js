const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: { type: Schema.Types.String, required: true, max: [30, "Max length is 20 characters"] },
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

module.exports = mongoose.model("Users", userSchema);

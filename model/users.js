const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: {
        firstName: Schema.Types.String,
        lastName: Schema.Types.String,
    },
    accountCreated: Schema.Types.String,
    profilePicture: Schema.Types.String,
});

module.exports = mongoose.model("users", userSchema);

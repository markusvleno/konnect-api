const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: Schema.Types.String, required: true, max: [20, "Max length is 20 characters"] },
    email: { type: Schema.Types.String, required: true },
    pwHash: { type: Schema.Types.String, required: true },
    pwSalt: { type: Schema.Types.String, required: true },
    userID: Schema.Types.ObjectId,
});

module.exports = mongoose.model("credentials", credentialSchema);

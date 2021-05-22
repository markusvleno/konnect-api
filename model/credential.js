const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
    username: { type: Schema.Types.String, required: true, max: [20, "Max length is 20 characters"] },
    email: { type: Schema.Types.String, required: true },
    pwHash: { type: Schema.Types.String, required: true },
    pwSalt: { type: Schema.Types.String, required: true },
});

module.exports = mongoose.model("Credentials", credentialSchema);

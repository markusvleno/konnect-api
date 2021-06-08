const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cookieSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: Schema.Types.String,
    cookieValue: Schema.Types.String,
    cookieExp: Schema.Types.Number,
});

module.exports = mongoose.model("cookies", cookieSchema);

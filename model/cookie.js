const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const miscSchema = new Schema({
    _id: Schema.Types.ObjectId,
    cookieName: Schema.Types.String,
    cookieValue: Schema.Types.String,
    cookieExp: Schema.Types.Date,
});

module.exports = mongoose.model("miscs", miscSchema);

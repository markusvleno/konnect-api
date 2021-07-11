const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    _id: Schema.Types.ObjectId,
    ChatID: Schema.Types.ObjectId,
    ChatChannel: Schema.Types.String,
    messages: [
        {
            origin: { type: Schema.Types.String },
            msgID: Schema.Types.Number,
            message: Schema.Types.Mixed,
            type: Schema.Types.String,
            timeStamp: { type: Schema.Types.Number, default: Date.now() },
        },
    ],
});

module.exports = mongoose.model("chat", chatSchema);

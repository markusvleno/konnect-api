const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    _id: Schema.Types.ObjectId,
    userID: Schema.Types.ObjectId,
    conversation: [
        {
            convID: Schema.Types.Number,
            username: Schema.Types.String,
            messages: [
                {
                    origin: { type: Schema.Types.Boolean, default: true },
                    msgID: Schema.Types.Number,
                    message: Schema.Types.Mixed,
                    type: Schema.Types.String,
                    timeStamp: { type: Schema.Types.Date, default: new Date() },
                },
            ],
        },
    ],
});

module.exports = mongoose.model("chat", chatSchema);

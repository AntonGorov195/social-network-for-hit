const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessagesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    message: { type: String, required: true },
});
module.exports = mongoose.model(
    "messages",
    MessagesSchema,
);

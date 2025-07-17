const mongoose = require("mongoose");

const ChatsSchame = new mongoose.Schema({
    users: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
        {
            text: { type: String, default: "" },
            date: { type: Date, default: Date.now() },
            sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        },
    ],
});
module.exports = mongoose.model("chats", ChatsSchame);

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
            default: [],
        },
    ],
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", userSchema);

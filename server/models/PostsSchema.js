const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostsSchema = new Schema({
    body: { type: String, required: true },
    date: { type: String, default: Date.now },
    label: { type: String, required: false },
    groupId: { type: Schema.Types.ObjectId, ref: "group", required: false },
    userId: { type: Schema.Types.ObjectId, required: false, ref: "User" },
    videoUrl: { type: String}
});
module.exports = mongoose.model(
    "posts",
    PostsSchema,
    "posts"
);

const mongoose = require('mongoose')
const PostsSchema = new mongoose.Schema({
    PostId : String,
    PostAuthor : String,
    PostContent : String,
    PostDate : Date,
    PostGroup: String,
    PostLable : String,
});
module.exports = mongoose.model("posts_collection", PostsSchema,"posts_collection");
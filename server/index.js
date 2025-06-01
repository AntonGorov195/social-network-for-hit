const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {post} = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB error:", err));

// Example schema
const PostsSchema = new mongoose.Schema({
    PostId : String,
    PostAuthor : String,
    PostContent : String,
    PostDate : Date,
    PostGroup: String,
    PostLable : String,
});
const Post = mongoose.model("posts_collection", PostsSchema,"posts_collection");

// API routes
app.get("/api/posts", async (req, res) => {
    console.log("try to get posts");
    const user = req.query.userid;
    console.log(typeof (user)+" " + user);
    console.log("Using database:", Post.db.name);
    console.log("Using collection:", Post.collection.name);
    const posts = await Post.find({PostAuthor: "123"});
    console.log(posts);
    res.json(posts);
});

app.post("/api/items", async (req, res) => {
    console.log("!");
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});
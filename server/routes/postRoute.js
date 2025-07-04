const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");

router.get("/", async (req, res) => {
    // console.log("try to get posts");
    const content = req.query.content;
    const groupName = req.query.groupName;
    const userSearch = req.query.userSearch;
    // console.log(typeof (user)+" " + user);
    // console.log("Using database:", Post.db.name);
    // console.log("Using collection:", Post.collection.name);
    const posts = await Post.find({
        PostContent: { $regex: content, $options: "i" },
        PostGroup: { $regex: groupName, $options: "i" },
        PostAuthor: { $regex: userSearch, $options: "i" },
    });
    // console.log(posts);
    res.json(posts);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");

router.get("/", async (req, res) => {
    console.log(req.originalUrl);
    const content = req.query.content;
    const groupName = req.query.groupName;
    const userSearch = req.query.userSearch;
    const find = {};
    if (req.query.content) {
        find.PostContent = { $regex: content, $options: "i" };
    }
    if (req.query.groupName) {
        find.PostGroup = { $regex: groupName, $options: "i" };
    }
    if (req.query.userSearch) {
        find.PostAuthor = { $regex: userSearch, $options: "i" };
    }
    const posts = await Post.find(find);
    res.json(posts);
});
router.get("/create", async (req, res) => {
    console.log(req.originalUrl);
    const PostAuthor = req.query.PostAuthor;
    const PostGroup = req.query.PostGroup;
    const PostContent = req.query.PostContent;
    // const find = {};
    // if (req.query.content) {
    //     find.PostContent = { $regex: content, $options: "i" };
    // }
    // if (req.query.groupName) {
    //     find.PostGroup = { $regex: groupName, $options: "i" };
    // }
    // if (req.query.userSearch) {
    //     find.PostAuthor = { $regex: userSearch, $options: "i" };
    // }
    const posts = await new Post({
        PostAuthor: PostAuthor,
        PostContent: PostContent,
        PostGroup: PostGroup,
    });
    res.json(posts);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require('../models/PostsSchema')

router.get('/', async (req, res) => {
    console.log("try to get posts");
    const user = req.query.userid;
    console.log(typeof (user)+" " + user);
    console.log("Using database:", Post.db.name);
    console.log("Using collection:", Post.collection.name);
    const posts = await Post.find({PostAuthor: "123"});
    console.log(posts);
    res.json(posts);
});

module.exports = router;
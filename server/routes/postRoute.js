const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/post", authMiddleware, async (req, res) => {
    const post = await Post.findById(req.query.postId);
    res.json(post);
});
router.put("/update", authMiddleware, async (req, res) => {
    const update = await Post.updateOne(
        { _id:  req.body.postId },
        { $set: { body: req.body.body } }
    );
    console.log(update);
    res.json({});
});
router.get("/", authMiddleware, async (req, res) => {
    const body = req.query.body;
    const groupName = req.query.groupName;
    const userSearch = req.query.userSearch;
    const find = [];
    if (req.query.body) {
        find.push({ $match: { body: { $regex: body, $options: "i" } } });
    }
    if (req.query.groupName) {
        find.push({
            $match: { "group.name": { $regex: groupName, $options: "i" } },
        });
    }
    if (req.query.userSearch) {
        find.push({
            $match: { "user.username": { $regex: userSearch, $options: "i" } },
        });
    }
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $lookup: {
                from: "groups",
                localField: "groupId",
                foreignField: "_id",
                as: "group",
            },
        },
        {
            $unwind: "$user", // deconstruct the array to get a single object
        },
        ...find,
        {
            $project: {
                _id: "$_id",
                body: "$body",
                date: "$date",
                label: "$label",
                groupName: "$group.name",
                username: "$user.username",
                userId: "$user._id",
            },
        },
    ]);

    const message = {
        posts: posts,
        userId: req.user.userId,
    };
    res.json(message);
});
router.post("/create", authMiddleware, async (req, res) => {
    const label = req.body.params.label;
    const body = req.body.params.body;
    const posts = await new Post({
        body: body,
        label: label,
        userId: req.user.userId,
    });
    await posts.save();
    // TODO:
    res.json({});
});

module.exports = router;

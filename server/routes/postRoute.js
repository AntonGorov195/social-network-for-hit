const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
    console.log(req.originalUrl);
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
        // {
        //     $unwind: "$group", // deconstruct the array to get a single object
        // },
        // {
        //     $match: {
        //         "body": { $regex: "", $options: "i" }, // case-insensitive match
        //     },
        // },
        ...find,
        {
            $project: {
                _id: 0,
                body: "$body",
                date: "$date",
                label: "$label",
                groupName: "$group.name",
                username: "$user.username",
            },
        },
    ]);
    res.json(posts);
});
router.post("/create", authMiddleware, async (req, res) => {
    console.log(req.originalUrl);
    console.log(req.user);
    console.log(req.body.params);
    const label = req.body.params.label;
    const body = req.body.params.body;
    const posts = await new Post({
        body: body,
        label: label,
        userId: req.user.userId,
    });
    await posts.save()
    res.json({});
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Group = require("../models/GroupSchema");
const Post = require("../models/PostsSchema");
const User = require("../models/UserSchema");

router.get("/postsPerGroup", async (req, res) => {
    console.log("trying to get all the posts of all groups");
    try {
        const postsPerGroup = await Group.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "groupId",
                    as: "posts"
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    postCount: {$size: '$posts'}
                }
    }
        ]);
        res.status(200).json(postsPerGroup);
        console.log("posts per group retrieved successfully");
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
})

router.get('/usersPerGroup', async (req, res) => {
    console.log("trying to get all users per groups");
    try {
        const usersPerGroup = await Group.aggregate([
            {
                $project: {
                    _id: 0,
                    name: 1,
                    userCount: {$size: '$members'}
                }
            }
        ])
        res.status(200).json(usersPerGroup);
        console.log("users per group retrieved successfully");
    }catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }
})

module.exports = router;
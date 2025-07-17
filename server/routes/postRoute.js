const express = require("express");
const router = express.Router();
const Post = require("../models/PostsSchema");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");
const {mkdirSync, writeFileSync} = require("node:fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/videos"), // folder for uploads
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/post", authMiddleware, async (req, res) => {
    const post = await Post.findById(req.query.postId);
    res.json(post);
});
router.put("/update", authMiddleware, async (req, res) => {
    // TODO: verify the token and userId match
    await Post.updateOne(
        { _id: req.body.postId },
        { $set: { body: req.body.body } }
    );
    res.json({});
});
router.delete("/delete", authMiddleware, async (req, res) => {
    await Post.deleteOne({
        _id: req.query.postId,
    }).catch(() => {
        console.error("Couldn't delete post");
    });
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
                videoUrl: "$videoUrl",
                canvasUrl: "$canvasUrl",
            },
        },
    ]);

    const message = {
        posts: posts,
        userId: req.user.userId,
    };
    res.json(message);
});
//router.post("/create", authMiddleware, async (req, res) => {
//     //const label = req.body.params.label;
//     //const body = req.body.params.body;
//     const label = req.body.label;
//     const body = req.body.body;
//     const postGroup = req.body.PostGroup;
//     if (body === undefined || body === "") {
//         res.status(400).json({
//             message: "attempt to create a post with an empty body",
//         });
//         return;
//     }
//     const posts = await new Post({
//         body: body,
//         label: label,
//         userId: req.user.userId,
//     });
//     await posts.save();
//     // TODO:
//     res.json({});
router.post("/create", authMiddleware, upload.single("video"),
        async (req, res) => {
    console.log("trying to create a post");
    try {
                const label = req.body.label;
                const body = req.body.body;
                const postGroup = req.body.groupId;
                const videoPath = req.file ? `/uploads/videos/${req.file.filename}` : null;
                const canvasImage =req.body.canvasImage;

        let canvasImagePath = null;

        if (canvasImage) {
            console.log("got canvas");
            try {
                const base64Data = canvasImage.replace(/^data:image\/png;base64,/, "");
                const filename = `${Date.now()}.png`;
                const savePath = path.join(__dirname, "../uploads/canvas", filename);
                mkdirSync(path.dirname(savePath), {recursive: true});
                writeFileSync(savePath, base64Data, "base64");
                canvasImagePath = `/uploads/canvas/${filename}`;
            }catch (err){
                console.error(err);
            }

        }

                if (!body) {
                    return res.status(400).json({ message: "Post body required" });
                }

                const newPost = new Post({
                    body,
                    label,
                    groupId: postGroup,
                    userId: req.user.userId,
                    videoUrl: videoPath,
                    canvasUrl: canvasImagePath,
                });

                await newPost.save();
                console.log("post created");
                return res.json({ message: "Post created", post: newPost });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Server error" });
            }
        }
    );
router.get("/getAllPostsOfGroup/:groupId", async (req, res) => {
    console.log("trying to get all the posts of a group");
    const groupId = req.params.groupId;
    try {
        const posts = await Post.find({ groupId });
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong", error: err });
    }
});

module.exports = router;

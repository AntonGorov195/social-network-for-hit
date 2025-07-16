const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");
const Chats = require("../models/ChatsSchema");

// router.get("/messages", authMiddleware, async (req, res) => {
//     const msg = await Messages.find({});
//     res.json({
//         messages: msg,
//     });
// });
// router.post("/message/send", authMiddleware, async (req, res) => {
//     try {
//         const msgs = await new Messages({
//             message: req.body.message,
//             userId: req.user.userId,
//         });
//         await msgs.save();
//     } catch (e) {
//         console.error(e);
//     }
// });
router.get("/", authMiddleware, async (req, res) => {
    try {
        const chatId = req.query.chatId;
        const chat = await Chats.findById(chatId);
        if (chat === null) {
            res.status(400).send("chat not found");
            return;
        }
        // Check if the user is part of the chat.
        const userId = req.user.userId;
        res.json({
            userId: userId,
            chat: chat,
        });
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;

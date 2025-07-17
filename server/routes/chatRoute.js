const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");
const Chats = require("../models/ChatsSchema");

router.get("/", authMiddleware, async (req, res) => {
    // try {
    //     const chatId = req.query.chatId;
    //     const chat = await Chats.findById(chatId);
    //     if (chat === null) {
    //         res.status(400).send("chat not found");
    //         return;
    //     }
    //     // Check if the user is part of the chat.
    //     const userId = req.user.userId;
    //     res.json({
    //         userId: userId,
    //         chat: chat,
    //     });
    // } catch (e) {
    //     console.error(e);
    // }
    try {
        const userId = req.user.userId;
        const chat = await Chats.findById(req.query.chatId)
            .populate("users", "username") // get usernames of chat users
            .populate("messages.sender", "username"); // get sender usernames
        
        res.json({
            userId: userId,
            messages: chat.messages,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({ error: e });
    }
});
router.get("/user", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const usersChats = await Chats.find({
            users: userId,
        }).populate("users", "username");
        const chats = usersChats.map((chat) => {
            const otherUser = chat.users.find(
                (user) => user._id.toString() !== userId
            );
            return {
                chatId: chat._id,
                otherUser: otherUser.username,
            };
        });
        // // Check if the user is part of the chat.
        res.json({
            userId: userId,
            chats: chats,
        });
    } catch (e) {
        res.status(400).json({ error: e });
        console.error(e);
    }
});

module.exports = router;

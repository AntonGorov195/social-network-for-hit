const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Messages = require("../models/MessagesSchema");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/messages", authMiddleware, async (req, res) => {
    const msg = await Messages.find({});
    res.json({
        messages: msg,
    });
});
router.post("/message/send", authMiddleware, async (req, res) => {
    try {
        const msgs = await new Messages({
            message: req.body.message,
            userId: req.user.userId,
        });
        await msgs.save();
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;

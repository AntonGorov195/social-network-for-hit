const socketIo = require("socket.io");
const User = require("../models/UserSchema");
const Chats = require("../models/ChatsSchema");

function InitSocket(server) {
    const io = socketIo(server, {
        cors: { origin: "http://localhost:3000" },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Join room for a specific chat
        socket.on("join-chat", (chatId) => {
            console.log(`join-chat ${chatId}`);
            socket.join(chatId);
        });

        // Receive message and broadcast to chat room
        socket.on("send-message", async ({ chatId, text, token }) => {
            const jwt = require("jsonwebtoken");
            const JWT_SECRET = process.env.JWT_SECRET;
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const userId = decoded.userId;
                const user = await User.findById(userId);
                console.log(`send-message ${text}, from ${user.username}`);
                io.to(chatId).emit("receive-message", {
                    text: text,
                    sender: {
                        username: user.username,
                        _id: userId,
                    },
                });
                const msg = {
                    text: text,
                    sender: userId,
                };
                await Chats.findByIdAndUpdate(chatId, {
                    $push: {
                        messages: msg,
                    },
                });
            } catch (e) {
                console.error(e);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
}
module.exports = InitSocket
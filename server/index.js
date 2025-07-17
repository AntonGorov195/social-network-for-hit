const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const Messages = require("./models/MessagesSchema");
const authMiddleware = require("./middlewares/authMiddleware");
const User = require("./models/UserSchema");
const Chats = require("./models/ChatsSchema");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Example schema

// API routes

const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");
const groupRouter = require("./routes/groupRoute");
const searchRouter = require("./routes/searchRoute");
const chatRouter = require("./routes/chatRoute");
const analyticsRouter = require("./routes/analyticsRoute");
const aiRouter = require("./routes/AIRoute");

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/search", searchRouter);
app.use("/api/chat", chatRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/AI", aiRouter);

app.post("/api/items", async (req, res) => {
    console.log("!");
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});
//
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "http://localhost:3000" },
});
// io.on("connection", (socket) => {
//     socket.on("chat message", async (data) => {
//         const jwt = require("jsonwebtoken");
//         const JWT_SECRET = process.env.JWT_SECRET;
//         try {
//             const token = data.token;
//             const decoded = jwt.verify(token, JWT_SECRET);
//             const userId = decoded.userId;
//             chatId = data.chatId;
//             const msg = {
//                 text: data.text,
//                 sender: userId,
//             };
//             await Chats.findByIdAndUpdate(chatId, {
//                 $push: {
//                     messages: msg,
//                 },
//             });
//             io.emit("chat message", {
//                 message: msg,
//                 chatId: data.chatId,
//             });
//         } catch (e) {
//             console.error(e);
//         }
//     });
// });
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
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("MongoDB connected");
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error("MongoDB error:", err));

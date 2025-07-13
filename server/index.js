const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const Messages = require("./models/MessagesSchema");
const authMiddleware = require("./middlewares/authMiddleware");

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
const analyticsRouter = require('./routes/analyticsRoute');


app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/search", searchRouter);
app.use("/api/chat", chatRouter);
app.use('/api/analytics',analyticsRouter);


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
io.on("connection", (socket) => {
    socket.on("chat message", async (data) => {
        const jwt = require("jsonwebtoken");
        const JWT_SECRET = process.env.JWT_SECRET;
        try {
            const token = data.token;
            let userId = "";
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.userId;
            const msgs = await new Messages({
                message: data.message,
                userId: userId,
            });
            io.emit("chat message", data.message);
            await msgs.save();
        } catch (e) {
            console.error(e);
        }
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

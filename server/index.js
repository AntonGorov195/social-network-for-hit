const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {post} = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB error:", err));

// Example schema


// API routes
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/userRoute');
const groupRouter = require('./routes/groupRoute');
const searchRouter = require('./routes/searchRoute');
const analyticsRouter = require('./routes/analyticsRoute');

app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);
app.use('/api/groups',groupRouter)
app.use('/api/search', searchRouter);
app.use('/api/analytics',analyticsRouter);


app.post("/api/items", async (req, res) => {
    console.log("!");
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://admin:QiRiP7RKlZbBNqVL@cluster0.zgymhm9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
    const { command, data } = req.body;

    try {
        switch (command) {
            case "insert":
                const newUser = new User({
                    name: data.name,
                    email: data.email,
                });
                await newUser.save();
                console.log(newUser);
                return res.json({
                    message: "user inserted successfully",
                    user: newUser,
                });
            case "select":
                const users = await User.find({});
                return res.json({ message: "users fetched ", users });
            case "update":
                const updateUser = await User.findByIdAndUpdate(
                    data.userId,
                    { email: data.newEmail },
                    { new: true }
                );
                if (!updateUser) {
                    return res.status(404).json({ message: "user not found" });
                }
                return res.json({ message: "user updated ", user: updateUser });
            case "delete":
                const deleteUser = await User.findByIdAndDelete(data.userId);
                if (!deleteUser) {
                    return res.status(404).json({ message: "user not found" });
                }
                return res.json({ message: "user deleted" });
            default:
                return res.status(400).json({ message: "unknown command" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server error" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("server running on port " + PORT);
});

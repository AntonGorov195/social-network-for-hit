const express = require("express");
const router = express.Router();
const Group = require("../models/GroupSchema");
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/getAllGroups", async (req, res) => {
    console.log("trying to get all groups");
    try {
        const groups = await Group.find({});
        res.status(200).json({
            message: "Groups retrieved successfully",
            data: groups,
        });
        console.log("Groups retrieved successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
        console.error(err);
    }
});
router.post("/createGroup", async (req, res) => {
    console.log("trying to create new group");
    try {
        const name = req.body.name;
        const description = req.body.description;
        const members = req.body.members;
        const manageruser = req.body.managerUser;
        const createdAt = req.body.createdAt
            ? new Date(req.body.createdAt)
            : undefined;
        if (
            !name ||
            !Array.isArray(members) ||
            members.length === 0 ||
            !manageruser
        ) {
            res.status(400).send("missing required parameters");
        } else {
            const newGroup = new Group({
                name: name,
                description: description,
                members: members,
                createdAt: createdAt,
                managerUser: manageruser,
            });
            const savedGroup = await newGroup.save();
            res.status(201).json({
                message: "Group created successfully",
                data: savedGroup,
            });
            console.log("Group created successfully");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
        console.log(err);
    }
});
router.put("/updateGroup", async (req, res) => {
    console.log("trying to update a group");
    const name = req.body.name;
    if (!name) {
        res.status(400).send("missing required parameters");
    } else {
        try {
            await Group.updateOne(
                { _id: req.body.groupId },
                { $set: { name: req.body.name } }
            );
            // const updatedGroup = await Group.findOneAndUpdate(
            // {name: name},
            // req.body,
            // {new: true}
            // )
            // if (!updatedGroup) {
            //     res.status(404).send("group not found");
            // }
            // else {
            //     res.status(200).json({message: 'Group updated successfully', data: updatedGroup});
            //     console.log("Group updated successfully");
            // }
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
            console.log(error);
        }
    }
});
router.delete("/deleteGroup", async (req, res) => {
    console.log("trying to delete a group");
    const name = req.body.name;
    if (!name) {
        res.status(400).send("missing required parameters");
    }
    try {
        const deletedGroup = await Group.findOneAndDelete({ name: name });
        if (!deletedGroup) {
            res.status(404).send("group not found");
        } else {
            res.status(200).json({
                message: "Group deleted successfully",
                data: deletedGroup,
            });
            console.log("Group deleted successfully");
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err });
        console.log(err);
    }
});
router.get("/getGroup", async (req, res) => {
    console.log("trying to get a group");
    const name = req.body.name;
    if (!name) {
        res.status(400).send("missing required parameters");
    } else {
        try {
            let query = { name: name };
            const group = await Group.find(query);
            res.status(200).json(group);
            console.log("Group get successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
});
router.get("/group", async (req, res) => {
    console.log("trying to get a group");
    const groupId = req.query.groupId;
    if (!groupId) {
        res.status(400).send("missing required parameters: groupId");
    } else {
        try {
            const group = await Group.findById(groupId);
            res.status(200).json(group);
            console.log("Group found successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
});
router.get("/getGroupsByParameters", async (req, res) => {
    console.log("trying to get a group by parameters");
    const { name, createdAt, members, description, managerUser } = req.query;
    try {
        let query = {};
        if (name) query.name = name;
        if (createdAt) query.createdAt = createdAt;
        if (members) query.members = members;
        if (description) query.description = description;
        if (managerUser) query.managerUser = managerUser;
        const groups = await Group.find(query);
        res.status(200).json({ groups: groups });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
router.get("/groupsOfUser",authMiddleware, async (req, res) => {
    console.log("trying to get a group by userId");
    const userId = req.user.userId;
    try {
        const group = await Group.find({ members: userId });
        res.status(200).json({ group: group });
        console.log("Groups get successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});
router.put("/addUserToGroup",authMiddleware, async (req, res) => {
    console.log("trying to add a user");
    const userId = req.user.userId;
    const groupId = req.body.groupId;
    if (!groupId || !userId) {
        console.log(groupId, userId);
        res.status(400).send("missing required parameters");
    }else
    {
        try {
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                {
                    $addToSet: {members: userId},
                    $set: {lastUpdatedAt: new Date()}
                },
                { new: true }
            )
            if (!updatedGroup) {
                res.status(404).send("group not found");
            }
            res.status(200).json({updatedGroup})
            console.log("user added successfully");
        }catch(err) {
            console.log(err);
            res.status(500).json({ error: err });
        }

    }
})
router.put("/deleteUserFromGroup",authMiddleware, async (req, res) => {
    console.log("trying to delete a user from group");
    const userId = req.user.userId;
    const groupId = req.body.groupId;
    if (!groupId || !userId) {
        res.status(400).send("missing required parameters");
    }else {
        try {
            const updatedGroup = await Group.findByIdAndUpdate(
                groupId,
                {
                    $pull: {members: userId},
                    $set: {lastUpdatedAt: new Date()}
                },
                { new: true }
            );if(!updatedGroup) {
                res.status(404).send("group not found");
            }
            res.status(200).json({updatedGroup})
        }catch(err) {
            console.log(err);
            res.status(500).json({ error: err });
        }
    }
})
module.exports = router;

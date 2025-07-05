const express = require("express");
const router = express.Router();
const Group = require("../models/GroupSchema");
const mongoose = require("mongoose");

router.get("/getAllGroups", async (req, res) => {
    console.log("trying to get all groups");
    try {
        const groups = await Group.find({});
        res.status(200).json({
            message: 'Groups retrieved successfully',
            data:groups
        });
        console.log("Groups retrieved successfully");
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        });
        console.error(err);
    }

})
router.post("/createGroup", async (req, res) => {
    console.log("trying to create new group");
    try {
        const name = req.body.name;
        const description = req.body.description;
        const members = req.body.members;
        const manageruser = req.body.managerUser
        const createdAt = req.body.createdAt ? new Date(req.body.createdAt) : undefined
        if (!name || !Array.isArray(members) || members.length === 0 || !manageruser) {
            res.status(400).send('missing required parameters');
        }
        else {
            const newGroup = new Group({
                name: name,
                description: description,
                members: members,
                createdAt: createdAt,
                managerUser: (manageruser)
            });
            const savedGroup = await newGroup.save();
            res.status(201).json({message: 'Group created successfully', data: savedGroup});
            console.log("Group created successfully");
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong',
            error: err
        });
        console.log(err)

    }

})
router.put("/updateGroup", async (req, res) => {
    console.log("trying to update a group");
    const name = req.body.name;
    if (!name){
        res.status(400).send('missing required parameters');
    }else {
        try {
            const updatedGroup = await Group.findOneAndUpdate(
            {name: name},
            req.body,
            {new: true}
            )
            if (!updatedGroup) {
                res.status(404).send("group not found");
            }
            else {
                res.status(200).json({message: 'Group updated successfully', data: updatedGroup});
                console.log("Group updated successfully");
            }
        }catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error: error
            });
            console.log(error);
        }
    }

});
router.delete("/deleteGroup", async (req, res) => {
    console.log("trying to delete a group");
    const name = req.body.name;
    try {
        const deletedGroup = await Group.findOneAndDelete({name:name});
        if (!deletedGroup) {
            res.status(404).send("group not found");
        }else {
            res.status(200).json({message: 'Group deleted successfully', data: deletedGroup});
            console.log("Group deleted successfully");
        }
    }catch(err) {
        res.status(500).json({message: 'Something went wrong', error: err});
        console.log(err);
    }
})

module.exports = router;
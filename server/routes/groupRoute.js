const express = require("express");
const router = express.Router();
const Group = require("../models/GroupSchema");

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
        })
    }

})
router.post("/createGroup", async (req, res) => {
    console.log("trying to create new group");
    try {
        const name = req.body.name;
        const description = req.body.description;
        const members = req.body.members;
        const createdAt = req.body.createdAt ? new Date(req.body.createdAt) : undefined
        if (!name || !Array.isArray(members) || members.length === 0) {
            res.status(400).send('missing required parameters');
        }
        else {
            const newGroup = new Group({
                name: name,
                description: description,
                members: members,
                createdAt: createdAt
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

    }

})
module.exports = router;
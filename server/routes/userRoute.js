const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const req = require("express/lib/request");
const res = require("express/lib/response");


router.post('/create', async (req, res) => {
    console.log("trying to create new user");
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const createdAt = req.body.createdAt ? new Date(req.body.createdAt) : undefined;
        if (!username || !password || !email) {
            res.status(400).send('missing required parameters');
        } else {
            const existingUser = await User.findOne({username: username});
            if (existingUser) {
                console.log('user already exists');
                res.status(400).send('user already exists');
            } else {
                const newUser = new User({username, password, email, createdAt});
                await newUser.save();
                res.status(201).json({message: 'successfully created user'});
                console.log("user created successfully");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
});
router.post('/login', async (req, res) => {
    console.log("request to login")
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).send('missing required parameters');
    } else {
        const existingUser = await User.findOne({username: username});
        if (!existingUser || existingUser.password !== password) {
            res.status(401).send('invalid username or password');
        } else {
            const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.json({'token': token});
            res.status(200).send("logged in successfully");
        }
    }
})
router.get('/getAllUsers', async (req, res) => {
    console.log('trying to get all users');
    try {
        const users = await User.find({});
        res.status(200).json({
            message: "users retrieved successfully",
            data: users
        })
        console.log("users retrieved successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "something went wrong",
            error: err
        });
    }
});
router.get('/getUsersByParameters', async (req, res) => {
console.log('trying to get users by parameters');
    const {username, email, createdAt} = req.query;
try {
    let query = {};
    if (username) query.username = username;
    if (email) query.email = email;
    if (createdAt) query.createdAt = createdAt;
    //const users = await User.find(query);
    res.status(200).json({users: users})
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: "something went wrong",
        error: err
    });
}
})
router.put('/updateUser', async (req, res) => {
    console.log("trying to update user");
    const username = req.body.username;
    if (!username) {
        res.status(400).send('missing required parameters');
    }else {
        try {
            const updatedUser = await User.findOneAndUpdate(
                {username: username},
                req.body,
                {new: true}
            );
            if (!updatedUser) {
                res.status(404).send('username not found');
            }else {
                res.status(200).json({message: 'successfully updated user',data: updatedUser});
                console.log("user updated successfully");
            }
        }catch(err) {
            console.log(err);
            res.status(500).json({
                message: "something went wrong",
                error: err
            })
        }
    }
})
router.delete('/deleteUser', async (req, res) => {
    console.log('trying to delete user');
    const username = req.body.username;
    if (!username) {
        res.status(400).send('missing required parameters');
    }try {
        const deletedUser = await User.findOneAndDelete({username: username});
        if (!deletedUser) {
            res.status(404).send('username not found');
        }else {
            res.status(200).json({message: 'successfully deleted user',data: deletedUser});
            console.log("user deleted successfully");
        }
    }catch(err) {
        console.log(err);
        res.status(500).json({message: "something went wrong",error: err});
    }

})
module.exports = router;
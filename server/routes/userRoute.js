const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');


router.post('/create', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const createdAt = req.body.createdAt ? new Date(req.body.createdAt) : undefined;
        if (!username || !password || !email) {
            res.status(400).send('missing required parameters');
        }else{
            const existingUser = await User.findOne({username:username});
            if (existingUser) {
                console.log('user already exists');
                res.status(400).send('user already exists');
            }else {
                const newUser = new User({username, password,email,createdAt});
                await newUser.save();
                res.status(201).json({message: 'successfully created user'});
        }
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    console.log("request to login")
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(400).send('missing required parameters');
    }else {
        const existingUser = await User.findOne({username:username});
        if (!existingUser || existingUser.password !== password) {
            res.status(401).send('invalid username or password');
        }
        else {
            const token = jwt.sign({username:username},process.env.JWT_SECRET,{expiresIn:'7d'});
            res.json({'token':token});
            res.status(200).send("logged in successfully");
        }
    }
})


module.exports = router;
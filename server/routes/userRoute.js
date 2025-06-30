const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');


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

module.exports = router;
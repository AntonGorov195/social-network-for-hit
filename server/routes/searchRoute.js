const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const Post = require('../models/PostsSchema');
const Group = require('../models/GroupSchema');

router.post('/:type', async (req, res) => {
    console.log("trying to search");
    //console.log(req.body);
    //console.log(req.params);
    const {type} = req.params;
    const filters =req.body;
    Object.keys(filters).forEach((key) => {
        if (typeof filters[key] === 'string') {
            filters[key] = { $regex: filters[key], $options: 'i' };
        }
    });
    const projection = type === 'user'?
        '-_id -__v -password'
        : '-_id -__v';

    try {
        let results;
        switch (type) {
            case 'user':
                results = await User.find(filters).select(projection);
                break;
                case 'post':
                    results = await Post.find(filters).select(projection);
                    break;
                    case 'group':
                        results = await Group.find(filters).select(projection);
                        break;
                        default:
                            return res.status(404).send('invalid search type');
        }
        res.status(200).send(results);
        console.log("search results found");
    }catch(err) {
        res.status(500).send(err);
    }
})
module.exports = router;
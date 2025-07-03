const mongoose = require('mongoose');

const GroupSchame = new mongoose.Schema({
    name: {type:String, required:true},
    createdAt: {type:Date,default:Date.now},
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    description: {type:String},
})
module.exports = mongoose.model("group", GroupSchame);
const mongoose = require('mongoose');
const replySchema = require('../schemas/replySchema')

// Tweet Schema
const tweetSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        username: String
    }],
    replies: [replySchema] 
});

// Tweet Model
module.exports = mongoose.model('Tweet', tweetSchema);
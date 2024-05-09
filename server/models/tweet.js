const mongoose = require('mongoose');
const replySchema = require('../schemas/replySchema')
const retweetSchema = require('../schemas/retweetSchema')
const likesSchema = require('../schemas/likesSchema');

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
    likes: [likesSchema],
    replies: [replySchema],
    retweets: [retweetSchema] 
});

// Tweet Model
module.exports = mongoose.model('Tweet', tweetSchema);
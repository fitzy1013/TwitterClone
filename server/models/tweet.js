const mongoose = require('mongoose');

// Reply Schema
const replySchema = mongoose.Schema({
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }
});

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
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = {
    Tweet,
    Reply: mongoose.model('Reply', replySchema)
};
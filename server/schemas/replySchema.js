const mongoose = require('mongoose');
const likesSchema = require('./likesSchema');

const replySchema = mongoose.Schema({
    // Include fields from tweetSchema
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
    // Reference to the parent tweet
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    // Array to store replies to this reply
    replies: [this], // Reference to the same schema (self-referencing)
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retweet'
    }]
});

module.exports = replySchema;
const mongoose = require('mongoose');
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
    likes: [{
        username: String
    }],
    // Reference to the parent tweet
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    // Array to store replies to this reply
    replies: [this] // Reference to the same schema (self-referencing)
});

module.exports = replySchema;
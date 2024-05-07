const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }
});

module.exports = replySchema;
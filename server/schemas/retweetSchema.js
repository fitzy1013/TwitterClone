const mongoose = require('mongoose')
const replySchema = require('../schemas/replySchema')
const likesSchema = require('../schemas/likesSchema')

const retweetSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    username : {
        type: String,
        required: true
    },
    quote: {
        type: String,
        required: false
    },
    likes : [likesSchema],
    retweets: [this],
    replies: [replySchema]
})

retweetSchema.pre('find', function(next) {
    this.populate('item');
    next();
});

module.exports = retweetSchema;
const mongoose = require('mongoose')

const likesSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    username : {
        type: String,
        required: true
    }
})

module.exports = likesSchema;
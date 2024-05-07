const mongoose = require('mongoose')

const likesSchema = mongoose.Schema({
    tweetID: {
		type: String,
		required: true
	},
    username : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Likes', likesSchema)
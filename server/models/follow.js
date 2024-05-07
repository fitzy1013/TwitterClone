const mongoose = require('mongoose')

const followSchema = mongoose.Schema({
    follower: {
		type: String,
		required: true
	},
    followed : {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Follow', followSchema)
const mongoose = require('mongoose')

const retweetSchema = mongoose.Schema({
    tweet: {
		type: Object,
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
    likes : [{
        username: String
    }]
    
})

module.exports = mongoose.model('Retweets', retweetSchema)
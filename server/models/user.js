const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	displayImageUrl: {
		type: String,
		default: ""
	},
	bannerImageUrl: {
		type: String,
		default: ""
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	displayName: {
		type: String,
		required: true
	},
	bio : {
		type: String,
		default: ""
	}
})

module.exports = mongoose.model('User', userSchema);
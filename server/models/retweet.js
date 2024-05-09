const mongoose = require('mongoose')
const retweetSchema = require('../schemas/retweetSchema')

module.exports = mongoose.model('Retweets', retweetSchema);
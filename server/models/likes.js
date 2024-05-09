const mongoose = require('mongoose')
const likesSchema = require('../schemas/likesSchema')

module.exports = mongoose.model('Likes', likesSchema)
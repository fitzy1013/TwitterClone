const mongoose = require('mongoose');
const replySchema = require('../schemas/replySchema')

module.exports = mongoose.model('Replies', replySchema);
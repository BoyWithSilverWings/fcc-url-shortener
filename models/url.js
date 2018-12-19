const mongoose = require('mongoose');
const shortid  = require('short-uuid');

//MONGOOSE MODEL CONFIG
var urlSchema = new mongoose.Schema({
    url: String,
    short: { type: String, default: shortid.generate }
});

module.exports = mongoose.model('Url', urlSchema);
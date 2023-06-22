const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortCode: String,
    longUrl: String,
    visits: Number,
    unique: Number
});

module.exports = mongoose.model('Url', urlSchema);
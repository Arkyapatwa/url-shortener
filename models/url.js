const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrlId: {
        type: String,
        required: true,
        unique: true
    },
    analytics: {
        visitHistory: [{
            accessedAt: Date,
            ip: String
        }]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Url = mongoose.model('url', urlSchema)

module.exports = Url
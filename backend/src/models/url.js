const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    urlCode: {
        type: String,
        required: true,
        unique: true
    },

    longUrl: {
        type: String,
        required: true
    },

    shortUrl: {
        type: String,
        required: true
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    },

    date: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }

});


const urlModel = mongoose.model('Url', urlSchema);

module.exports = urlModel;
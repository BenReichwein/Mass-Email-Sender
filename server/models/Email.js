const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('email', EmailSchema);
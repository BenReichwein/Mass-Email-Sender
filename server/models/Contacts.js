const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contacts', ContactSchema);
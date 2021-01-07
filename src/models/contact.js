const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    }
})

exports.Contact = mongoose.model('Contact', contactSchema);
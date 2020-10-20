const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    uid: String,
    email: String,
    firstname: String,
    lastname: String,
    fullname: String,
    imageurl: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
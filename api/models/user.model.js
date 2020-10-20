const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    uid: { type: String, required: true },
    email: String,
    firstname: String,
    lastname: String,
    fullname: String,
    imageurl: String,
    avatar: String,
    color: String,
    checked: Boolean,
    online: Boolean,
    decoded: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
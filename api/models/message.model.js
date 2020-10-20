const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    uid: { type: String, required: true },
    language: String,
    recipient: { type: String, required: true },
    recipient_fullname: String,
    sender: String,
    sender_fullname: String,
    status: String,
    metadata: mongoose.Schema.Types.Mixed,
    text: { type: String, required: true },
    timestamp: String,
    headerDate: String,
    type: String,
    attributes: mongoose.Schema.Types.Mixed,
    channel_type: String,
    isSender: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
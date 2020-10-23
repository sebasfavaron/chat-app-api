const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    uid: String,
    attributes: mongoose.Schema.Types.Mixed,
    channel_type: String,
    conversation_with_fullname: String,
    recipient: String,
    recipient_fullname: String,
    image: String,
    is_new: Boolean,
    last_message_text: String,
    sender: String,
    senderAuthInfo: mongoose.Schema.Types.Mixed,
    sender_fullname: String,
    status: String,
    timestamp: String,
    time_last_message: String,
    selected: Boolean,
    color: String,
    avatar: String,
    archived: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
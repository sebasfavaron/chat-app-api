const Conversation = require('../models/conversation.model');
const mongoose = require('mongoose');
// const conversationLib = require('../lib/messages.lib');

class ConversationController {
    static async getConversations(req, res, next) {
        try {
            var filter = {}
            if (req.query.archived) filter['archived'] = req.query.archived
            const conversations = await Conversation.find(filter).exec();

            res.status(200).json({
                data: conversations
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async postConversation(req, res, next) {
        try {

            const conversation = new Conversation({
                // _id: new ObjectID(),
                uid: req.body.uid || 1,
                attributes: req.body.attributes || "",
                channel_type: req.body.channel_type || "direct",
                conversation_with_fullname: req.body.conversation_with_fullname || "",
                recipient: req.body.recipient || "",
                recipient_fullname: req.body.recipient_fullname || "",
                image: req.body.image || "",
                is_new: req.body.is_new || false,
                last_message_text: req.body.last_message_text || "",
                sender: req.body.sender || "",
                senderAuthInfo: req.body.senderAuthInfo || "",
                sender_fullname: req.body.sender_fullname || "",
                status: req.body.status || "",
                timestamp: req.body.timestamp || "",
                time_last_message: req.body.time_last_message || "",
                selected: req.body.selected || false,
                color: req.body.color || "grey",
                avatar: req.body.avatar || "",
                archived: req.body.archived || false
            });

            conversation.save(function (err, message) {
                if (err) return console.error(err);
            })

            res.status(200).json({
                message: 'Conversation saved succesfully'
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports.ConversationController = ConversationController;
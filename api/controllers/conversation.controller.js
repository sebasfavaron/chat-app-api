const Conversation = require('../models/conversation.model');
const mongoose = require('mongoose');
// const conversationLib = require('../lib/messages.lib');

class ConversationController {
    static async getConversation(req, res, next) {
        try {
            const conversations = await Conversation.find({
                uid: req.query.uid,
                recipient: req.query.recipient, // TODO: check if this query is well done
            }).exec();
            let conversation = conversations.length == 0 ? {} : conversations[0]

            res.status(200).json({
                data: conversation
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
                uid: req.body.uid,
                attributes: req.body.attributes,
                channel_type: req.body.channel_type,
                conversation_with_fullname: req.body.conversation_with_fullname,
                recipient: req.body.recipient,
                recipient_fullname: req.body.recipient_fullname,
                image: req.body.image,
                is_new: req.body.is_new,
                last_message_text: req.body.last_message_text,
                sender: req.body.sender,
                senderAuthInfo: req.body.senderAuthInfo,
                sender_fullname: req.body.sender_fullname,
                status: req.body.status,
                timestamp: req.body.timestamp,
                time_last_message: req.body.time_last_message,
                selected: req.body.selected,
                color: req.body.color,
                avatar: req.body.avatar
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
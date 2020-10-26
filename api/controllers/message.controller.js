const Message = require('../models/message.model');
const mongoose = require('mongoose');
// const messagesLib = require('../lib/messages.lib');

class MessagesController {
    static async getMessages(req, res, next) {
        try {
            var filter = {}
            if (req.query.uid) filter['uid'] = req.query.uid
            if (req.query.recipient) filter['recipient'] = req.query.recipient
            const messages = await Message.find(filter).exec();

            res.status(200).json({
                data: messages
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async postMessage(req, res, next) {
        try {

            const message = new Message({
                // _id: new ObjectID(),
                uid: req.body.uid || 1,
                language: req.body.language || "en",
                recipient: req.body.recipient || "",
                recipient_fullname: req.body.recipient_fullname || "",
                sender: req.body.sender || "",
                sender_fullname: req.body.sender_fullname || "",
                status: req.body.status || "",
                metadata: req.body.metadata || "",
                text: req.body.text || "",
                timestamp: req.body.timestamp || "2000-01-01T23:59:59",
                headerDate: req.body.headerDate || "",
                type: req.body.type || "",
                attributes: req.body.attributes || "",
                channel_type: req.body.channel_type || "",
                isSender: req.body.isSender || false,
            });

            message.save(function (err, message) {
                if (err) return console.error(err);
            })

            res.status(200).json({
                message: 'Message saved succesfully'
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports.MessagesController = MessagesController;
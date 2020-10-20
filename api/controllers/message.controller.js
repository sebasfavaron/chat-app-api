const Message = require('../models/message.model');
const mongoose = require('mongoose');
const messagesLib = require('../lib/messages.lib');

class MessagesController {
    static async getMessages(req, res, next) {
        try {
            const messages = await Message.find({}).exec();

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
                uid: req.body.uid,
                language: req.body.language,
                recipient: req.body.recipient,
                recipient_fullname: req.body.recipient_fullname,
                sender: req.body.sender,
                sender_fullname: req.body.sender_fullname,
                status: req.body.status,
                metadata: req.body.metadata,
                text: req.body.text,
                timestamp: req.body.timestamp,
                headerDate: req.body.headerDate,
                type: req.body.type,
                attributes: req.body.attributes,
                channel_type: req.body.channel_type,
                isSender: req.body.isSender,
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
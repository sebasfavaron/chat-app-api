const User = require('../models/user.model');
const mongoose = require('mongoose');
// const userLib = require('../lib/user.lib');

class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await User.find({}).exec();

            res.status(200).json({
                data: users
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async getUser(req, res, next) {
        try {
            const users = await User.find({
                uid: req.query.uid
            }).exec();
            let user = users.length == 0 ? {} : users[0]

            res.status(200).json({
                data: user
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    static async postUser(req, res, next) {
        try {

            // TODO: do not post user if uid exists in DB already

            const user = new User({
                // _id: new ObjectID(),
                uid: req.body.uid,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                fullname: req.body.fullname,
                imageurl: req.body.imageurl,
                avatar: req.body.avatar,
                color: req.body.color,
                checked: req.body.checked,
                online: req.body.online,
                decoded: req.body.decoded
            });

            user.save(function (err, message) {
                if (err) return console.error(err);
            })

            res.status(200).json({
                message: 'User saved succesfully'
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}

module.exports.UserController = UserController;
const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/message.controller');
const userCtrl = require('../controllers/user.controller');
const conversationCtrl = require('../controllers/conversation.controller');

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/messages', messagesCtrl.MessagesController.getMessages);
router.post('/message', messagesCtrl.MessagesController.postMessage);

router.get('/users', userCtrl.UserController.getUsers);
router.get('/user', userCtrl.UserController.getUser);
router.post('/user', userCtrl.UserController.postUser);

router.get('/conversations', conversationCtrl.ConversationController.getConversations);
router.post('/conversation', conversationCtrl.ConversationController.postConversation);

// router.post('/mutants', mutantsCtrl.MutantsController.checkMutant);
// router.get('/stats', mutantsCtrl.MutantsController.getMutantsStats);


module.exports = router;
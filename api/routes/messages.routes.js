const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/message.controller');

router.get('/', function (req, res) {
    res.send('Hello World!');
});
router.get('/messages', messagesCtrl.MessagesController.getMessages);
router.post('/message', messagesCtrl.MessagesController.postMessage);
// router.post('/mutants', mutantsCtrl.MutantsController.checkMutant);
// router.get('/stats', mutantsCtrl.MutantsController.getMutantsStats);


module.exports = router;
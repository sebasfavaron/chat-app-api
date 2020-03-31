const express = require('express');
const router = express.Router();
const mutantsCtrl = require('../controllers/mutants.controller');

router.get('/',  function (req, res) {
    res.send('Hello Mutants!');
});
router.post('/mutants', mutantsCtrl.MutantsController.checkMutant);
router.get('/stats', mutantsCtrl.MutantsController.getMutantsStats);

module.exports = router;
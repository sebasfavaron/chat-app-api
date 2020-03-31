const express = require('express');
const router = express.Router();
const mutantsCtrl = require('../controllers/mutants.controller');

router.post('/mutants', mutantsCtrl.MutantsController.checkMutant);
router.get('/stats', mutantsCtrl.MutantsController.getMutantsStats);

module.exports = router;
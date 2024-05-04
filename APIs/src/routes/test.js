const express = require('express');
const router = express.Router();
const test = require('../controllers/test')

router.get('/cycles-count/:id',test.getCyclesCount);
router.get('/active-cycle:id',test.getActiveCycle);
router.get('/premedications:id',test.getPremedications);
router.get('/chemotherapy:id',test.getChemotherapy);
router.get('/dumppatient',test.moemad)


module.exports = router;
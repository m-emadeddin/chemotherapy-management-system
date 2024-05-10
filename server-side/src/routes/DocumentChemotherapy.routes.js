const express = require('express');
const router = express.Router();
const test = require('../controllers/DocumentChemotherapy.controllers')

router.get('/cycles-count/:id',test.getCyclesCount); // done 
router.get('/active-cycle/:id',test.getActiveCycle); // 
router.get('/premedications/:id',test.getPremedications); // done 
router.get('/chemotherapy/:id',test.getChemotherapy); // done 


module.exports = router;
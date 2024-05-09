const express = require('express');
const router = express.Router();
const orderChemo = require('../controllers/OrderChemotherapy.controllers');

router.get('/get-regimen/:id', orderChemo.getRegimens);
router.get('/pre-medications', orderChemo.getPreMedications);
router.get('/chemo-medications', orderChemo.getChemoMedications);


module.exports = router;
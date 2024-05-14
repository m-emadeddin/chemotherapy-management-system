const express = require('express');
const router = express.Router();
const orderChemo = require('../controllers/OrderChemotherapy.controllers');

router.get('/get-regimen/:id', orderChemo.getRegimens);
router.get('/pre-medications/:id', orderChemo.getPreMedications);
router.get('/chemo-medications/:id', orderChemo.getChemoMedications);
router.get('/patient-no/:id', orderChemo.cycleDate);

module.exports = router;

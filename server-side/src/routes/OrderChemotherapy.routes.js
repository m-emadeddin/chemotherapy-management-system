const express = require('express');
const router = express.Router();
const orderChemo = require('../controllers/OrderChemotherapy.controllers');
const authMiddleware = require("../middlewares/auth.middlewares");

router.get('/get-regimen/:id',authMiddleware ,orderChemo.getRegimens);
router.get('/pre-medications/:id',authMiddleware ,orderChemo.getPreMedications);
router.get('/chemo-medications/:id',authMiddleware ,orderChemo.getChemoMedications);
router.get('/patient-no/:date',authMiddleware ,orderChemo.cycleDate);


module.exports = router;
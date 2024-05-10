const express = require('express');
const router = express.Router();
const PatientPage = require("../controllers/PatientPage.controllers");

router.get('/:id', PatientPage.getVitalSigns);
router.get('/cancer-overview/:id',PatientPage.getCancerOverview);

module.exports = router;
const express = require('express');
const router = express.Router();
const PatientPage = require('../controllers/PatientPage.controllers');

router.get('/vital-sign/:id', PatientPage.getVitalSigns);
router.get('/cancer-overview/:id', PatientPage.getCancerOverview);
router.get('/medical/:id', PatientPage.getMedicalAnalysis);
router.get('/radiography/:id', PatientPage.getRadiography);

module.exports = router;

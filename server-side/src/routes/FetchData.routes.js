const express = require('express');
const router = express.Router();
const fetchData = require('../controllers/FetchData.controllers');

router.post('/patient',fetchData.postNewPatient); // add new patient 
router.post('/vital-signs/:id',fetchData.postVitalSigns);
router.post('/cancer-overview/:id',fetchData.postCancerOverview);
router.post('/radiography/:id',fetchData.postRadiography);
router.post('/medical-analysis/:id',fetchData.postMedicalAnalysis);

module.exports = router;

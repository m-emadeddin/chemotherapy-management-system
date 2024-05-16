const express = require('express');
const router = express.Router();
const PatientPage = require('../controllers/PatientPage.controllers');

//=========================Patient====================================✔
router.get('/all-patients', PatientPage.getAllPatients);
router.post('/add-patient', PatientPage.postNewPatient);
router.delete('/delete-patient/:id', PatientPage.deletePatient);

//=========================Vital Signs================================✔
router.get('/vital-sign/:id', PatientPage.getVitalSigns); 
router.post('/add-vital-signs/:id', PatientPage.postVitalSigns);

//=========================Radiography================================✔
router.get('/radiography/:id', PatientPage.getRadiography);
router.post('/add-radiography/:id', PatientPage.postRadiography);
router.put('/:id/radiography-update/:radiographyId', PatientPage.updateRadiography);

//=========================Medical Analysis===========================✔
router.get('/medical/:id', PatientPage.getMedicalAnalysis);
router.post('/add-medical/:id', PatientPage.postMedicalAnalysis);
router.put('/:id/medical-update/:medicalId', PatientPage.updateMedicalAnalysis);

//=========================Cancer Overview============================✔
router.get('/cancer-overview/:id', PatientPage.getCancerOverview);
router.post('/add-cancer-overview/:id', PatientPage.postCancerOverview);

//=========================Side Effects============================ ✔
router.post('/add-side-effects/:id', PatientPage.postSideEffects);

//=========================Treatment Plan==========================✔
router.get('/has-treatmentplan/:id', PatientPage.hasTreatmentplan);


module.exports = router;

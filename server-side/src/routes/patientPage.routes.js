const express = require('express');
const router = express.Router();
const PatientPage = require('../controllers/PatientPage.controllers');
const authMiddleware = require("../middlewares/auth.middlewares");

//=========================Patient====================================✔
router.get('/all-patients',authMiddleware ,PatientPage.getAllPatients);
router.post('/add-patient',authMiddleware ,PatientPage.postNewPatient);
router.delete('/delete-patient/:id',authMiddleware ,PatientPage.deletePatient);
router.get('/active-patients',authMiddleware ,PatientPage.getActivePatients);
router.get('/non-active-patients',authMiddleware ,PatientPage.getNonActivePatients);

//=========================Vital Signs================================✔
router.get('/vital-sign/:id',authMiddleware ,PatientPage.getVitalSigns); 
router.post('/add-vital-signs/:id',authMiddleware ,PatientPage.postVitalSigns);

//=========================Radiography================================✔
router.get('/radiography/:id',authMiddleware ,PatientPage.getRadiography);
router.post('/add-radiography/:id',authMiddleware ,PatientPage.postRadiography);
router.put('/:id/radiography-update/:radiographyId',authMiddleware ,PatientPage.updateRadiography);

//=========================Medical Analysis===========================✔
router.get('/medical/:id',authMiddleware ,PatientPage.getMedicalAnalysis);
router.post('/add-medical/:id',authMiddleware ,PatientPage.postMedicalAnalysis);
router.put('/:id/medical-update/:medicalId',authMiddleware ,PatientPage.updateMedicalAnalysis);

//=========================Cancer Overview============================✔
router.get('/cancer-overview/:id',authMiddleware ,PatientPage.getCancerOverview);
router.post('/add-cancer-overview/:id',authMiddleware ,PatientPage.postCancerOverview);

//=========================Side Effects============================ ✔
router.post('/add-side-effects/:id',authMiddleware ,PatientPage.postSideEffects);

//=========================Treatment Plan==========================✔
router.get('/has-treatmentplan/:id',authMiddleware ,PatientPage.hasTreatmentplan);


module.exports = router;

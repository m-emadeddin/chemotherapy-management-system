const express = require('express');
const router = express.Router();
const Patient = require('../controllers/SelectPatient.controllers');

router.get('/all-patients',Patient.getAllPatients);
router.delete("/delete-patient/:id", Patient.deletePatient);

module.exports = router;
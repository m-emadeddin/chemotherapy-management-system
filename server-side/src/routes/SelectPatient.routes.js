const express = require('express');
const router = express.Router();
const Patient = require('../controllers/SelectPatient.controllers');

router.get('/all-patients',Patient.getAllPatients);

module.exports = router;
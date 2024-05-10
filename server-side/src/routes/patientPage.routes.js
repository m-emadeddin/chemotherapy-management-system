const express = require('express');
const router = express.Router();
const PatientVitalSign = require("../controllers/PatientPage.controllers");

router.get('/:id', PatientVitalSign.getVitalSigns);

module.exports = router;
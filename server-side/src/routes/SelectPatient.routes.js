const express = require('express');
const router = express.Router();
const test = require('../controllers/SelectPatient.controllers');

router.get('/all-patients',test.getAllPatients);

module.exports = router;
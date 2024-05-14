const express = require('express');
const router = express.Router();
const fetchData = require('../controllers/FetchData.controllers');

router.post('/patient',fetchData.postNewPatient); // add new patient 
router.post('/vital-signs/:id',fetchData.postVitalSigns);
router.post('/cancer-overview/:id',fetchData.postCancerOverview);


module.exports = router;

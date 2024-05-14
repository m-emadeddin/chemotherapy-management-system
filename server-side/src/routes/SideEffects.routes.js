const express = require('express');
const router = express.Router();
const SideEffects = require('../controllers/SideEffects.controllers');

router.post('/add-side-effects/:id', SideEffects.AddOrUpdateSideEffects);

module.exports = router;
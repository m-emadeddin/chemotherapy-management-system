const express = require("express");
const router = express.Router();
const documentChemo = require("../controllers/DocumentChemotherapy.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

router.get("/regimen-info/:id",authMiddleware, documentChemo.getRegimenInfo); //done✔
router.get("/cycles-info/:id",authMiddleware ,documentChemo.getCyclesInfo); //done✔
router.get("/active-cycle/:id",authMiddleware , documentChemo.getActiveCycle); //done✔
router.get("/premedications/:id",authMiddleware , documentChemo.getPremedications); //done✔
router.get("/chemotherapy/:id",authMiddleware ,documentChemo.getChemotherapy); //done✔
router.patch("/cycles-updates/:id",authMiddleware , documentChemo.updateCycleAndMedications); //done

module.exports = router;

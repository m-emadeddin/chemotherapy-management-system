const express = require("express");
const router = express.Router();
const documentChemo = require("../controllers/DocumentChemotherapy.controllers");

router.get("/regimen-info/:id", documentChemo.getRegimenInfo); //done
router.get("/cycles-info/:id", documentChemo.getCyclesInfo); //done
router.get("/active-cycle/:id", documentChemo.getActiveCycle); //done
router.get("/premedications/:id", documentChemo.getPremedications); //done
router.get("/chemotherapy/:id", documentChemo.getChemotherapy); //done
//router.get('/chemotherapy/:patientId/cycle/:cycleId/', documentChemo.getChemotherapy);
router.patch(
  "/cycles-updates/:cycleId",
  documentChemo.updateCycleAndMedications
); //done

module.exports = router;

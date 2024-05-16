const express = require("express");
const controller = require("../controllers/ReviewChemotherapy.controllers");

const router = express.Router();

// reviewChemotherabyRouter.post("/patient/:id", controller.reviewChemotheraby);
router.post("/:patientId", controller.reviewChemotheraby);

module.exports = router;

const express = require("express");
const controller = require("../controllers/ReviewChemotherapy.controllers");

const reviewChemotherabyRouter = express.Router();

// reviewChemotherabyRouter.post("/patient/:id", controller.reviewChemotheraby);
reviewChemotherabyRouter.post("/add-review/:patientId", controller.reviewChemotheraby);
reviewChemotherabyRouter.get("/review/:patientId", controller.getTreatmentPlan);

module.exports = reviewChemotherabyRouter;

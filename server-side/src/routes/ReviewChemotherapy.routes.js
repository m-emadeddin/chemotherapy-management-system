const express = require("express");
const controller = require("../controllers/ReviewChemotherapy.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");
const reviewChemotherabyRouter = express.Router();


reviewChemotherabyRouter.post("/add-review/:patientId",authMiddleware ,controller.reviewChemotheraby);
reviewChemotherabyRouter.get("/review/:patientId",authMiddleware ,controller.getTreatmentPlan);

module.exports = reviewChemotherabyRouter;

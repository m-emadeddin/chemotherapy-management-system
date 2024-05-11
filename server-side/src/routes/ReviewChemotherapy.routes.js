const express = require("express");
const controller = require("../controllers/ReviewChemotherapy.controllers");

const reviewChemotherabyRouter = express.Router();

// reviewChemotherabyRouter.post("/patient/:id", controller.reviewChemotheraby);
reviewChemotherabyRouter.post("/:patientId", controller.reviewChemotheraby);

module.exports = reviewChemotherabyRouter;

// import models
const Chemotherapy = require("../models/ChemotherapyMedications.models");
const Premedications = require("../models/Premedications.models");
const TreatmentPlan = require("../models/TreatmentPlans.models");
const Patients = require("../models/index.models").Patients;
let info = {};

exports.getCyclesCount = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      patient.getTreatmentPlan().then((treatmentplan) => {
        info.cycle_count = treatmentplan.number_of_Cycles;
        res.status(200).send(info);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getActiveCycle = (req, res, next) => {};

exports.getPremedications = (req, res, next) => {};

exports.getChemotherapy = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      info.cycle_count = treatmentplan.number_of_Cycles;
      let plan_id = treatmentplan.Plan_ID;
      return treatmentplan.getCycles();
    })
    .then((cycles) => {
      const cyclePromises = cycles.map((cycle) => {
        return cycle.getChemotherapyMedications().then((chemotherapy) => {
          const chemoMeds = chemotherapy.map((chemoMeds) => ({
            name: chemoMeds.Medication_Name,
            dose: chemoMeds.Dose,
            route : chemoMeds.Route,
            Instructions: chemoMeds.Instructions,
            Administered_Dose : chemoMeds.Administered_Dose_ml
          }));
          return {
            cycleNumber: cycle.Cycle_Number,
            chemotherapyMedications: chemoMeds,
          };
        });
      });
      return Promise.all(cyclePromises).then((cycleInfo) => {
        const info = {
          cycles: cycleInfo,
        };
        res.status(200).send(info);
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

// import models
const Patients = require("../models/index.models").Patients;


exports.getCyclesCount = (req, res, next) => {
  let info = {};
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

exports.getPremedications = (req, res, next) => {
  let info = {};
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        throw new Error("Patient not found");
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      if (!treatmentplan) {
        throw new Error("Treatment plan not found");
      }
      return treatmentplan.getCycles();
    })
    .then((cycles) => {
      if (!cycles) {
        throw new Error("Cycles not found");
      }
      const promises = cycles.map((cycle) => cycle.getPremedications());
      return Promise.all(promises).then((premedicationsByCycle) => {
        // Combine cycles with their premedications
        const formattedPremedicationsByCycle = cycles.map((cycle, index) => ({
          cycleNumber: cycle.Cycle_Number,
          premedications: premedicationsByCycle[index].map((premedication) => ({
            Medication: premedication.Medication_Name,
            Dose: premedication.Dose,
            Route: premedication.Route,
            Instructions: premedication.Instructions,
          })),
        }));
        info = {
          cycles: formattedPremedicationsByCycle,
        };
        res.status(200).send(info);
      });
    })
    .catch((err) => {
      console.error("Error:", err.message);
      res.status(500).send({ message: "Internal server error" });
    });
};

exports.getChemotherapy = (req, res, next) => {
  let info = {};
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        throw new Error("Patient not found");
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      info.cycle_count = treatmentplan.number_of_Cycles;
      return treatmentplan.getCycles();
    })
    .then((cycles) => {
      const cyclePromises = cycles
        .map((cycle) => {
          return cycle.getChemotherapyMedications()
          .then((chemotherapy) => {
            const chemoMeds = chemotherapy.map((chemoMeds) => ({
              name: chemoMeds.Medication_Name,
              dose: chemoMeds.Dose,
              reduction: chemoMeds.Dosage_Reduction,
              route: chemoMeds.Route,
              Instructions: chemoMeds.Instructions,
              Administered_Dose_ml: chemoMeds.Administered_Dose_ml,
            }));
            return {
              cycleNumber: cycle.Cycle_Number,
              chemotherapyMedications: chemoMeds,
            };
        })
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

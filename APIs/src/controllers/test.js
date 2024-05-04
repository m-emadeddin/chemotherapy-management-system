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

exports.getPremedications = (req, res, next) => {
  const ID = req.params.id;
  const info = {}; // Define info object to store data

  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        throw new Error('Patient not found');
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      if (!treatmentplan) {
        throw new Error('Treatment plan not found');
      }
      return treatmentplan.getPremedications();
    })
    .then((premedications) => {
      console.log("---------------------");
      console.log(premedications)
      if (!premedications || premedications.length === 0) {
        throw new Error('Premedications not found');
      }
      // Assuming premedications is an array of premedication objects
      // If it's just one premedication, you might want to access it directly
      const premedication = premedications[0];
      info.Medication = premedication.Medication_Name;
      info.Dose = premedication.Dose;
      info.Route = premedication.Route;
      info.Instructions = premedication.Instructions;
      console.log(info);
      res.status(200).send(info);
    })
    .catch((err) => {
      console.error('Error:', err.message);
      res.status(500).send({ message: 'Internal server error' });
    });
};


exports.getChemotherapy = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      patient.getTreatmentPlan().then((treatmentplan) => {
        info.cycle_count = treatmentplan.number_of_Cycles;
        let plan_id = treatmentplan.Plan_ID;
        treatmentplan.getCycles().then((cycles) => {
            console.log(cycles);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.moemad = (req, res, next) => {
  const data1 = [
    { height: "Height", distance: "176.784 cm" },
    { height: "Weight", distance: "58.967 kg" },
    { height: "(Calculated) BMI", distance: "19.8" },
    { height: "Temperature", distance: "37.9 °C" },
    { height: "Heart Rate", distance: "60 /min" },
    { height: "Respiratory Rate", distance: "15 /min" },
    { height: "Blood Pressure", distance: "140/80" },
    { height: "O2 Sat", distance: "95 %" },
  ];
  info.data1 = data1; // Add data1 array to info object
  res.status(200).send(info);
    
};

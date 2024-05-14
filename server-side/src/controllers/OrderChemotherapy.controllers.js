const TreatmentPlanReadOnly =
  require('../models/index.models').treatmentPlanReadOnly;
const Patients = require('../models/index.models').Patients;
const db = require("../models/index.models");
const { Op, fn, col } = require("sequelize");

function removeSpecialCharacters(str) {
  // Remove other non-word and non-space characters
  return str.replace(/[^\w\s]/gi, ''); // Replace all non-word and non-space characters
}

exports.getRegimens = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      return patient.getCancerOverview();
    })
    .then((Canceroverview) => {
      if (!Canceroverview) {
        return res.status(400).json({ error: 'Canceroverview not found' });
      }
      return Canceroverview.Cancer_type;
    })
    .then((cancerType) => {
      const cleanedCancerType = removeSpecialCharacters(cancerType);
      console.log(cleanedCancerType,cancerType);
      return TreatmentPlanReadOnly.findAll({
        where: {Cancer_Type: {
          [Op.like]: `%${cancerType.toLowerCase()}%`
        }},
        attributes: ['Plan_Name', 'Plan_ID','number_of_Cycles','number_of_Weeks'],
      });
    })
    .then((regimenName) => {
      if (!regimenName || regimenName.length == 0) {
        return res.status(404).json({ error: 'Regimen not found' });
      }
      res.status(200).json({ regimenName });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getChemoMedications = (req, res, next) => {
  const regimenID = req.params.id;
  TreatmentPlanReadOnly.findByPk(regimenID)
    .then((regimen) => {
      if (!regimen) {
        return res.status(404).json({ error: 'Regimen not found' });
      }
      return regimen.getChemotherapyMedReads();
    })
    .then((chemotherapy) => {
      // fetches the chemotherapy related to certain regimen
      const chemoMeds = chemotherapy.map((chemoMedication) => ({
        // fetches one Medication  & iterates over all chemotherapy Medications
        name: chemoMedication.Medication_Name,
        dose: chemoMedication.Dose,
        route: chemoMedication.Route,
        Instructions: chemoMedication.Instructions,
      }));
      return chemoMeds;
    })
    .then((chemoMedications) => {
      res.status(200).json({ chemoMedications });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPreMedications = (req, res, next) => {
  const regimenID = req.params.id;
  TreatmentPlanReadOnly.findByPk(regimenID)
    .then((regimen) => {
      if (!regimen) {
        console.log(regimen);
        return res.status(404).json({ error: 'Regimen not found' });
      }
      return regimen.getPremedicationReads();
    })
    .then((premedications) => {
      const preMed = premedications.map((medication) => ({
        name: medication.Medication_Name,
        dose: medication.Dose,
        route: medication.Route,
        Instructions: medication.Instructions,
      }));
      return preMed;
    })
    .then((preMedications) => {
      res.status(200).send({ preMedications });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.cycleDate = async (req,res,next)=> {
      const {date} = req.params
      const dateTime = new Date(date)
      const cycles = await db.Cycles.findAll({
        where: {
          Start_Date:dateTime,
        },
      });
      res.status(200).json({patientsNumber:cycles.length});
};

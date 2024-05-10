const TreatmentPlanReadOnly =
  require('../models/index.models').treatmentPlanReadOnly;
const Patients = require('../models/index.models').Patients;

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
      console.log(cancerType);
      return TreatmentPlanReadOnly.findAll({
        where: { Cancer_Type: cancerType },
        attributes: ['Plan_Name', 'Plan_ID'],
      });
    })
    .then((regimenName) => {
      if (!regimenName) {
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

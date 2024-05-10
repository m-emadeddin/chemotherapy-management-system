// import models
const Patients = require('../models/index.models').Patients;
const CancerOverview = require('../models/index.models').CancerOverview;

exports.getVitalSigns = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      return patient.getVitalSign();
    })
    .then((VitalSign) => {
      if (!VitalSign) {
        return res.status(404).json({ error: "Vital signs not found" });
      }
      //let bmi = VitalSign.Weight / (VitalSign.Height / 100) ** 2;
     // bmi = parseFloat(bmi.toFixed(1));

      const response = {
        Blood_Pressure: VitalSign.Blood_Pressure,
        Height: VitalSign.Height,
        Weight: VitalSign.Weight,
        Heart_Rate: VitalSign.Heart_rate,
        BMI: VitalSign.BMI,
        Temperature: VitalSign.Temp,
        Last_Update: VitalSign.last_updated,
        Chief_Complaint: VitalSign.Chief_Complaint,
      };

      res.status(200).json({ response });
    })
    .catch((err) => {
      console.error('Error:', err.message);
    });
};

exports.getCancerOverview = (req, res) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      return patient.getCancerOverview();
    })
    .then((cancerOverview) => {
      if (!cancerOverview) {
        return res.status(404).json({ error: "CancerOverview not found" });
      }
      cancerOverview = {
        Diagnoses: cancerOverview.Cancer_type,
        Staging: cancerOverview.Stage,
        Note: cancerOverview.Note_On_cancer,
      };
      res.status(200).json({ cancerOverview });
    })
    .catch((err) => {
      console.error('Error getting data:', err);
    });
};


exports.getRadiography = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      return patient.getRadiographies();
    }).then((radiography)=>{
      if (!radiography) {
        return res.status(404).json({ error: 'Radiography Not found' });
      }
      return res.status(200).json({radiography});
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMedicalAnalysis = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      return patient.getMedicals();
    }).then((MedicalAnalysis)=>{
      if (!MedicalAnalysis) {
        return res.status(404).json({ error: 'Radiography Not found' });
      }
      return res.status(200).json({MedicalAnalysis});
    })
    .catch((err) => {
      console.log(err);
    });
};

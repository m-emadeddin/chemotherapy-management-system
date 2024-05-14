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
exports.updateMedicalAnalysis = (req, res, next) => {
  const patientId = req.params.id;
  const { Urinanalysis, CBC, Electrophoresis, CEA, AFP, B2M ,Tumor_size} = req.body;
  Patients.findByPk(patientId)
      .then((patient) => {
          if (!patient) {
              return res.status(404).json({ error: 'Patient not found' });
          } 
          return patient.getMedicals();
      })
      .then((medicalAnalysisArray) => {
          if (!medicalAnalysisArray || medicalAnalysisArray.length === 0) {
              return res.status(404).json({ error: 'Medical Analysis not found for this patient' });
          }
          const medicalAnalysis = medicalAnalysisArray[0]; 
          medicalAnalysis.update({
              Urinanalysis: Urinanalysis,
              CBC: CBC,
              Electrophoresis: Electrophoresis,
              CEA: CEA,
              AFP: AFP,
              B2M: B2M,
              Tumor_size:Tumor_size
          })
          .then(() => {
              res.status(200).json({ message: 'Medical Analysis updated successfully' });
          })
          .catch(() => {
              console.error('Error updating medical analysis:');
              res.status(500).json({ error: 'Internal Server Error' });
          });
      })
      .catch((error) => {
          console.error('Error finding patient or medical analysis:', error);
      });
};
exports.updateRadiography = (req, res, next) => {
  const patientId = req.params.id;
  const { MRI, CT, PET_CT, Ultrasound, XRay, Mammography, DEXA } = req.body;

  Patients.findByPk(patientId)
      .then((patient) => {
          if (!patient) {
              return res.status(404).json({ error: 'Patient not found' });
          } 

          return patient.getRadiographies();
      })
      .then((radiographies) => {
          if (!radiographies || radiographies.length === 0) {
              return res.status(404).json({ error: 'Radiographies not found for this patient' });
          }

          const radiography = radiographies[0];
          radiography.update({
              MRI: MRI,
              CT: CT,
              PET_CT: PET_CT,
              Ultrasound: Ultrasound,
              XRay: XRay,
              Mammography: Mammography,
              DEXA: DEXA
          })
          .then(() => {
              res.status(200).json({ message: 'Radiography updated successfully' });
          })
          .catch(() => {
              console.error('Error updating radiography:');
              res.status(500).json({ error: 'Internal Server Error' });
          });
      })
      .catch((error) => {
          console.error('Error finding patient or radiography:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
};

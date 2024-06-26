// import models
const Patients = require('../models/index.models').Patients;

//=========================Patient====================================
exports.getAllPatients = (req, res) => {
  Patients.findAll()
    .then((patients) => {
      res.status(200).json({ patients });
    })
    .catch((error) => {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postNewPatient = (req, res) => {
  const {
    Name,
    Age,
    Gender,
    date_of_birth,
    nationality,
    blood_type,
    disease_type,
    street,
    city,
    governorate,
    mobile,
    verified,
  } = req.body;
  //1. checking for any Null attribute, since all cols can not be null
  if (
    Name === null ||
    Age === null ||
    Gender === null ||
    date_of_birth === null ||
    nationality === null ||
    blood_type === null ||
    disease_type === null ||
    street === null ||
    city === null ||
    governorate === null ||
    mobile === null ||
    verified === null
  ) {
    return res.status(400).json({ error: "attributes can't be Null" });
  }
  //2. cheching for duplicate patient entry
  // to do ...
  //3. create new patient
  Patients.create({
    Name: Name,
    Age: Age,
    Gender: Gender,
    date_of_birth: date_of_birth,
    nationality: nationality,
    blood_type: blood_type,
    disease_type: disease_type,
    street: street,
    city: city,
    governorate: governorate,
    mobile: mobile,
    verified: verified,
  })
    .then((patient) => {
      res.status(200).json({ message: 'patient added sucessfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'internal server error' });
    });
};

exports.deletePatient = (req, res, next) => {
  const patientId = req.params.id;
  let Patient_Name;
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      Patient_Name = patient.Name;
      patient
        .destroy()
        .then((deletedRows) => {
          if (deletedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
          }
          res
            .status(200)
            .json({ message: `Patient ${Patient_Name} deleted successfully` });
        })
        .catch((error) => {
          console.error('Error deleting patient:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch((error) => {
      console.error('Error fetching patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getActivePatients = (req, res, next) => {
  Patients.findAll()
    .then((patients) => {
      let active_patients = [];
      let treatmentPlanPromises = patients.map((patient) => {
        return patient.getTreatmentPlan()
          .then((treatmentPlan) => {
            if (treatmentPlan) {
              active_patients.push(patient);
            }
          })
          .catch((treatmentPlanError) => {
            console.error('Error fetching treatment plan:', treatmentPlanError);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      });

      return Promise.all(treatmentPlanPromises)
        .then(() => {
          res.status(200).json({ active_patients });
        });
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.getNonActivePatients = (req, res, next) => {
  Patients.findAll()
    .then((patients) => {
      let non_active_patients = [];
      let treatmentPlanPromises = patients.map((patient) => {
        return patient
          .getTreatmentPlan()
          .then((treatmentPlan) => {
            if (!treatmentPlan) {
              non_active_patients.push(patient);
            }
          })
          .catch((treatmentPlanError) => {
            console.error("Error fetching treatment plan:", treatmentPlanError);
            res.status(500).json({ error: "Internal Server Error" });
          });
      });
      return Promise.all(treatmentPlanPromises)
      .then(() => {
        res.status(200).json({ non_active_patients });
      })
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

//=========================Vital Signs================================
exports.getVitalSigns = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      patient.getVitalSigns().then((VitalSigns) => {
        if (!VitalSigns || VitalSigns.length === 0) {
          return res.status(404).json({ error: 'Vital signs not found' });
        }
        res.status(200).json({ VitalSigns });
      });
    })
    .catch((err) => {
      console.error('Error:', err.message);
    });
};

exports.postVitalSigns = (req, res) => {
  const id = req.params.id;
  const {
    Blood_Pressure,
    Height,
    Weight,
    Heart_rate,
    BMI,
    Temp,
    Chief_Complaint,
  } = req.body;
  //1. check if data is null
  if (
    Blood_Pressure == null ||
    Height == null ||
    Weight == null ||
    Heart_rate == null ||
    BMI == null ||
    Temp == null ||
    Chief_Complaint == null
  ) {
    return res.status(400).json({ error: "attributes can't be Null" });
  }
  //2. find patient
  Patients.findByPk(id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      patient
        .createVitalSign({
          Blood_Pressure: Blood_Pressure,
          Height: Height,
          Weight: Weight,
          Heart_rate: Heart_rate,
          BMI: BMI,
          Temp: Temp,
          Chief_Complaint: Chief_Complaint,
        })
        .then((vitalSign) => {
          return res
            .status(200)
            .json({ message: 'New vital signs added successfully' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: 'internal server error' });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    });
};

//=========================Radiography================================
exports.getRadiography = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      patient.getRadiographies().then((radiography) => {
        if (!radiography || radiography.length === 0) {
          return res.status(404).json({ error: 'Radiography Not found' });
        }
        return res.status(200).json({ radiography });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postRadiography = (req, res) => {
  const id = req.params.id;
  const { MRI, CT, PET_CT, Ultrasound, XRay, Mammography, DEXA } = req.body;
  //1. check if data is null
  if (
    MRI == null ||
    CT == null ||
    PET_CT == null ||
    Ultrasound == null ||
    XRay == null ||
    Mammography == null ||
    DEXA == null
  ) {
    return res.status(400).json({ error:  "attributes can't be Null" });
  }
  //2. find patient
  Patients.findByPk(id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      //3. create new radiography
      patient
        .createRadiography({
          MRI: MRI,
          CT: CT,
          PET_CT: PET_CT,
          Ultrasound: Ultrasound,
          XRay: XRay,
          Mammography: Mammography,
          DEXA: DEXA,
        })
        .then(() => {
          return res
            .status(200)
            .json({ message: 'New radiography added successfully' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: 'internal server error' });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    });
};

exports.updateRadiography = (req, res, next) => {
  const patientId = req.params.id;
  const Radiography_ID = req.params.radiographyId;
  const { MRI, CT, PET_CT, Ultrasound, XRay, Mammography, DEXA } = req.body;

  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
       // logic to update any radiography
      patient
       .getRadiographies({ where: { Radiography_ID: Radiography_ID } }) 
       .then((radiographies) => {
        if (!radiographies || radiographies.length === 0) {
          return res.status(404).json({ error: 'Radiographies not found for this patient' });
        }
        const radiography = radiographies[0];
        radiography
          .update({
            MRI: MRI,
            CT: CT,
            PET_CT: PET_CT,
            Ultrasound: Ultrasound,
            XRay: XRay,
            Mammography: Mammography,
            DEXA: DEXA,
          })
          .then(() => {
            res.status(200).json({ message: 'Radiography updated successfully' });
          })
          .catch(() => {
            console.error('Error updating radiography:');
            res.status(500).json({ error: 'Internal Server Error' });
          });
      });
    })
    .catch((error) => {
      console.error('Error finding patient or radiography:', error);
    });
};

//=========================Medical Analysis===========================
exports.getMedicalAnalysis = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      patient.getMedicals().then((MedicalAnalysis) => {
        if (!MedicalAnalysis || MedicalAnalysis.length === 0) {
          return res.status(404).json({ error: 'Medical Analysis Not found' });
        }
        return res.status(200).json({ MedicalAnalysis });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postMedicalAnalysis = (req, res) => {
  const id = req.params.id;
  const { Urinanalysis, CBC, Electrophoresis, CEA, AFP, B2M, Tumor_size } =
    req.body;
  //1. check if data is null
  if (
    Urinanalysis == null ||
    CBC == null ||
    Electrophoresis == null ||
    CEA == null ||
    AFP == null ||
    B2M == null ||
    Tumor_size == null
  ) {
    return res.status(400).json({ error:  "attributes can't be Null" });
  }
  //2. find patient
  Patients.findByPk(id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      //3. create new radiography
      patient
        .createMedical({
          Urinanalysis: Urinanalysis,
          CBC: CBC,
          Electrophoresis: Electrophoresis,
          CEA: CEA,
          AFP: AFP,
          B2M: B2M,
          Tumor_size: Tumor_size,
        })
        .then(() => {
          return res
            .status(200)
            .json({ message: 'New Medical analysis added successfully' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: 'internal server error' });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    });
};

exports.updateMedicalAnalysis = (req, res, next) => {
  const patientId = req.params.id;
  const medicalId = req.params.medicalId;
  const { Urinanalysis, CBC, Electrophoresis, CEA, AFP, B2M, Tumor_size } = req.body;
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      // to access any premedication and edit
      patient
        .getMedicals({ where: { MedicalAnalysis_ID: medicalId } })
        .then((medicalAnalysisArray) => {
          //logic to edit only last one
          //patient.getMedicals().then((medicalAnalysisArray) => {
          if (!medicalAnalysisArray || medicalAnalysisArray.length === 0) {
            return res
              .status(404)
              .json({ error: "Medical Analysis not found for this patient" });
          }
          const medicalAnalysis = medicalAnalysisArray[0];
          medicalAnalysis
            .update({
              Urinanalysis: Urinanalysis,
              CBC: CBC,
              Electrophoresis: Electrophoresis,
              CEA: CEA,
              AFP: AFP,
              B2M: B2M,
              Tumor_size: Tumor_size,
            })
            .then(() => {
              res
                .status(200)
                .json({ message: "Medical Analysis updated successfully" });
            })
            .catch(() => {
              console.error("Error updating medical analysis:");
              res.status(500).json({ error: "Internal Server Error" });
            });
        });
    })
    .catch((error) => {
      console.error("Error finding patient or medical analysis:", error);
    });
};

//=========================Cancer Overview============================
exports.getCancerOverview = (req, res) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      patient.getCancerOverview().then((cancerOverview) => {
        if (!cancerOverview) {
          return res.status(404).json({ error: 'CancerOverview not found' });
        }
        cancerOverview = {
          Diagnoses: cancerOverview.Cancer_type,
          Staging: cancerOverview.Stage,
          Note: cancerOverview.Note_On_cancer,
        };
        res.status(200).json({ cancerOverview });
      });
    })
    .catch((err) => {
      console.error('Error getting data:', err);
    });
};

exports.postCancerOverview = (req, res) => {
  const id = req.params.id;
  const { Stage, Cancer_type, Note_On_cancer } = req.body;
  //1. check if data is null
  if (Stage == null || Cancer_type == null) {
    return res.status(400).json({ error: "attributes can't be Null" });
  }
  //2. find patient
  Patients.findByPk(id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      //2. check if cancer overview already exists
      patient.getCancerOverview().then((canceroverview) => {
        if (canceroverview) {
          return res
            .status(400)
            .json({ message: 'cancer overview already exists!' });
        }
        //3. add cancer overview
        patient
          .createCancerOverview({
            Stage: Stage,
            Cancer_type: Cancer_type,
            Note_On_cancer: Note_On_cancer,
          })
          .then(() => {
            return res
              .status(200)
              .json({ message: 'cancer overview added successfully' });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: 'internal server error' });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    });
};

//=========================Side Effects===============================
exports.postSideEffects = (req, res) => {
  const id = req.params.id;
  const {
    Nausea,
    Loss_of_appetite,
    Changes_in_kidney_and_liver_function,
    Psychological_effects,
    Loss_of_memory,
    Gastrointestinal_disturbances,
    Hair_loss,
    Skin_change,
    Blood_cell_loss,
    Date,
    Cycle_Number,
  } = req.body;
  //1. check if data is null

  if (
    Nausea == null ||
    Loss_of_appetite == null ||
    Changes_in_kidney_and_liver_function == null ||
    Psychological_effects == null ||
    Loss_of_memory == null ||
    Gastrointestinal_disturbances == null ||
    Hair_loss == null ||
    Skin_change == null ||
    Blood_cell_loss == null ||
    Date == null ||
    Cycle_Number == null
  ) {
    return res.status(400).json({ error: "attributes can't be Null" });
  }
  //2. find patient
  Patients.findByPk(id)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      //3. add side Effect
      patient
        .createSideEffect({
          Nausea: Nausea,
          Loss_of_appetite: Loss_of_appetite,
          Changes_in_kidney_and_liver_function: Changes_in_kidney_and_liver_function,
          Psychological_effects: Psychological_effects,
          Loss_of_memory: Loss_of_memory,
          Gastrointestinal_disturbances: Gastrointestinal_disturbances,
          Hair_loss: Hair_loss,
          Skin_change: Skin_change,
          Blood_cell_loss: Blood_cell_loss,
          Date: Date,
          Cycle_Number: Cycle_Number,
        })
        .then((sideEffects) => {
          return res.status(200).json({ message: "side effects added successfully" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "internal server error" });
    });
};

//========================= Treatment Plan ===============================
exports.hasTreatmentplan = (req, res, next) => {
  const ID = req.params.id;
  let Patient_Name;
  let Treatment_plan;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient Not found' });
      }
      Patient_Name = patient.Name;
      patient
        .getTreatmentPlan()
        .then((treatmentplan) => {
          if (!treatmentplan || treatmentplan.length === 0) {
            return res.status(200).json({ exists: false });
          }
          Treatment_plan = treatmentplan.Plan_Name;
          return res.status(200).json({ exists: true });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

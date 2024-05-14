const Patients = require('../models/index.models').Patients;

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
      //3 calculate BMI if not calculated by other team
      // to do ...
      //4. create new vital sign
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

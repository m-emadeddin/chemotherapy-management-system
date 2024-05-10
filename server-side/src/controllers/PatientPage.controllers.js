// import models
const Patients = require("../models/index.models").Patients;

exports.getVitalSigns = (req, res, next) => {
      const ID = req.params.id;
      Patients.findByPk(ID)
       .then((patient) => {
          if (!patient) {
            throw new Error("Patient not found");
          }

       return patient.getVitalSign();
    })
    .then((VitalSign) => {
      if (!VitalSign) {
        throw new Error("Vital signs not found");
      }
      let bmi = VitalSign.Weight /(VitalSign.Height / 100) ** 2;
      bmi = parseFloat(bmi.toFixed(1))

      const response = {
        Blood_Pressure: VitalSign.Blood_Pressure,
        Height:VitalSign.Height,
        Weight: VitalSign.Weight,
        Heart_Rate: VitalSign.Heart_rate,
        BMI: bmi,
        Temperature: VitalSign.Temp,
        Last_Update: VitalSign.last_updated,
        Chief_Complaint: VitalSign.Chief_Complaint,
      };

      res.status(200).send(response);
    })
    .catch((err) => {
      console.error("Error:", err.message);
      res.status(500).send({ message: "Internal server error" });
    });
};


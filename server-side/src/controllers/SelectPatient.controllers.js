const { where } = require("sequelize");

const Patients = require("../models/index.models").Patients;

exports.getAllPatients = (req, res) => {
  Patients.findAll()
    .then((patients) => {
      res.status(200).json({ patients });
    })
    .catch((error) => {
      console.error("Error fetching patients:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
exports.deletePatient = (req, res, next) => {
  const patientId = req.params.id;
  let Patient_Name;
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      Patient_Name = patient.Name;
      patient
        .destroy()
        .then((deletedRows) => {
          console.log(deletedRows);
          if (deletedRows === 0) {
            return res.status(404).json({ error: "Patient not found" });
          }
          res
            .status(200)
            .json({ message: `Patient ${Patient_Name} deleted successfully` });
        })
        .catch((error) => {
          console.error("Error deleting patient:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error fetching patient:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};


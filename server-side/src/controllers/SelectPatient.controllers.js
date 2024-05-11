const { where } = require("sequelize");

const Patients = require("../models/index.models").Patients;

exports.getAllPatients = (req, res) => {
    Patients.findAll()
        .then(patients => {
            res.status(200).json({ patients });
        })
        .catch(error => {
            console.error("Error fetching patients:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};
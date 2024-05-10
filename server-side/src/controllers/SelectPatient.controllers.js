const { where } = require("sequelize");

const Patients = require("../models/index.models").Patients;

exports.getAllPatients = (req,res) => {
    let info = Patients.findAll();
    res.status(200).json({info}); 
    
};

// exports.getAllPatients = async (req, res) => {
//     try {
//         // Fetch all patients
//         const patients = await Patients.findAll();

//         // Send JSON response
//         res.status(200).json({ patients });
//     } catch (error) {
//         // Handle errors
//         console.error("Error fetching patients:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.getAllPatients = (req,res) => {
//     let info = Patients.findAll()
//     .then(() => {
//         res.status(200).send(info); 
//     })
//     .catch((err) => {
//         console.log(err);
//       });
    
// }
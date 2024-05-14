const { SideEffects, Patients } = require("../models/index.models");

exports.AddOrUpdateSideEffects = (req, res) => {
    const patientId = req.params.id;

    Patients.findByPk(patientId)
        .then((patient) => {
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            return SideEffects.findOne({ where: { id: patientId } });
        })
        .then((sideEffect) => {
            if (sideEffect) {
                // Update existing side effect
                return sideEffect.update({
                    Nausea: req.body.Nausea,
                    Loss_of_appetite: req.body.Loss_of_appetite,
                    Changes_in_kidney_and_liver_function: req.body.Changes_in_kidney_and_liver_function,
                    Psychological_effects: req.body.Psychological_effects,
                    Loss_of_memory: req.body.Loss_of_memory,
                    Gastrointestinal_disturbances: req.body.Gastrointestinal_disturbances,
                    Hair_loss: req.body.Hair_loss,
                    Skin_change: req.body.Skin_change,
                    Blood_cell_loss: req.body.Blood_cell_loss
                }).then((updatedSideEffect) => {
                    res.status(200).json({ sideEffect: updatedSideEffect });
                });
            } else {
                // Create new side effect
                return SideEffects.create({
                    Nausea: req.body.Nausea,
                    Loss_of_appetite: req.body.Loss_of_appetite,
                    Changes_in_kidney_and_liver_function: req.body.Changes_in_kidney_and_liver_function,
                    Psychological_effects: req.body.Psychological_effects,
                    Loss_of_memory: req.body.Loss_of_memory,
                    Gastrointestinal_disturbances: req.body.Gastrointestinal_disturbances,
                    Hair_loss: req.body.Hair_loss,
                    Skin_change: req.body.Skin_change,
                    Blood_cell_loss: req.body.Blood_cell_loss,
                    PatientId: patientId
                }).then((newSideEffect) => {
                    res.status(201).json({ sideEffect: newSideEffect });
                });
            }
        })
        .catch((err) => {
            console.error('Error adding data:', err);
        });
};
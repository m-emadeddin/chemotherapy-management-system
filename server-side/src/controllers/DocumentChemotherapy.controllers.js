// import models
const Patients = require("../models/index.models").Patients;
const Cycles = require("../models/index.models").Cycles;
const ChemotherapyMedications =require("../models/index.models").ChemotherapyMedications;

exports.getRegimenInfo = (req, res, next) => {
  const patientId = req.params.id;
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      patient
        .getTreatmentPlan()
        .then((treatmentPlan) => {
          if (!treatmentPlan) {
            return res
              .status(404)
              .json({ message: "Treatment plan not found for this patient" });
          }
          const info = {
            Cycle_Count: treatmentPlan.number_of_Cycles,
            Regimen_Name: treatmentPlan.Plan_Name,
          };
          res.status(200).json(info);
        })
        .catch((treatmentPlanError) => {
          console.error("Error fetching treatment plan:", treatmentPlanError);
          res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((patientError) => {
      console.error("Error fetching patient:", patientError);
      res.status(500).json({ message: "Internal server error" });
    });
};
exports.getCyclesInfo = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      if (!treatmentplan) {
        return res.status(404).json({ error: "Treatment plan not found" });
      }
      return treatmentplan.getCycles();
    })
    .then((cycles) => {
      if (!cycles || cycles.length === 0) {
        return res.status(404).json({ error: "Cycles not found" });
      }
      // Represent all cycles data
      const cyclesInfo = cycles.map((cycle) => ({
        Cycle_ID: cycle.Cycle_ID,
        Cycle_Number: cycle.Cycle_Number,
        Cycle_Note: cycle.Cycle_note,
        Documentation_Date: cycle.Cycle_Documentation_Date,
      }));
      // Construct the response object
      const responseObj = { Cycles: cyclesInfo };
      // Send the response with the retrieved cycles
      res.status(200).json(responseObj);
    })
    .catch((error) => {
      // Handle any unexpected errors
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
    });
};

exports.getActiveCycle = (req, res, next) => {
  const ID = req.params.id;
  Patients.findByPk(ID)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentplan) => {
      if (!treatmentplan) {
        return res.status(404).json({ error: "Treatment plan not found" });
      }
      return treatmentplan.getCycles();
    })
    .then((cycles) => {
      if (!cycles || cycles.length === 0) {
        return res.status(404).json({ error: "Cycles not found" });
      }
      // Find the active cycle
      const activeCycle = cycles.find((cycle) => cycle.Is_active);
      if (!activeCycle) {
        return res.status(404).json({ error: "Active cycle not found" });
      }
      // Get the number and ID of the active cycle
      const activeCycleInfo = {
        Active_Cycle_Number: activeCycle.Cycle_Number,
      };
      // Send the response with the number and ID of the active cycle
      res.status(200).json(activeCycleInfo);
    })
    .catch((error) => {
      // Handle any unexpected errors
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
    });
};
exports.getPremedications = (req, res, next) => {
  let info = {};
  const cycle_ID = req.params.id;

  Cycles.findByPk(cycle_ID)
    .then((cycle) => {
      if (!cycle) {
        return res.status(404).send({ message: "Cycle not found" });
      }
      // Retrieve premedications for the cycle
      return cycle.getPremedications().then((premedications) => {
        // Format premedications
        const formattedPremedications = premedications.map((premedication) => ({
          Premed_ID: premedication.Premed_ID,
          Medication: premedication.Medication_Name,
          Dose: premedication.Dose,
          Route: premedication.Route,
          Instructions: premedication.Instructions,
        }));

        // Send response
        info = {
          Premedications: formattedPremedications,
        };
        res.status(200).send(info);
      });
    })
    .catch((err) => {
      console.error("Error:", err.message);
      res.status(500).send({ message: "Internal server error" });
    });
};
exports.getChemotherapy = (req, res, next) => {
  let info = {};
  const cycle_ID = req.params.id;

  Cycles.findByPk(cycle_ID)
    .then((cycle) => {
      if (!cycle) {
        return res.status(404).send({ message: "Cycle not found" });
      }
      // Retrieve chemotherapy medications for the cycle
      return cycle.getChemotherapyMedications().then((chemoMeds) => {
        // Format chemotherapy medications
        const formattedChemoMeds = chemoMeds.map((med) => ({
          Chemotherapy_id: med.Chemotherapy_ID,
          Name: med.Medication_Name,
          Dose: med.Dose,
          Reduction: med.Dosage_Reduction,
          Route: med.Route,
          Instructions: med.Instructions,
          AdministeredDose_Ml: med.Administered_Dose_ml,
          AdministeredDose_Mg: med.Administered_Dose_mg,
        }));

        // Send response
        info = {
          Chemotherapy_Medications: formattedChemoMeds,
        };
        res.status(200).send(info);
      });
    })
    .catch((err) => {
      console.error("Error:", err.message);
      res.status(500).send({ message: "Internal server error" });
    });
};
// exports.getChemotherapy = (req, res, next) => {
//   let info = {};
//   let Cycle_Number ;
//   const patientId = req.params.patientId;
//   const cycleId = req.params.cycleId;

//   Patients.findByPk(patientId)
//     .then((patient) => {
//       if (!patient) {
//         return res.status(404).json({ message: "Patient not found" });
//       }
//       return patient.getTreatmentPlan();
//     })
//     .then((treatmentPlan) => {
//       if (!treatmentPlan) {
//         return res.status(404).json({ message: "Treatment plan not found" });
//       }
//       // Find the specific cycle by ID
//       return treatmentPlan.getCycles({ where: { Cycle_ID: cycleId } });
//     })
//     .then((cycles) => {
//       Cycle_Number = cycles[0].Cycle_Number
//       console.log(Cycle_Number)
//       if (!Cycle_Number){
//         return res.status(404).json({ message: "Cycle not found" });
//       }
//       console.log(Cycle_Number)
//       if (!cycles || cycles.length === 0) {
//         return res.status(404).json({ message: "Cycle not found" });
//       }
//       // Retrieve chemotherapy medications for the specific cycle
//       return cycles[0].getChemotherapyMedications();
//     })
//     .then((chemotherapy) => {
//       const chemoMeds = chemotherapy.map((med) => ({
//         name: med.Medication_Name,
//         dose: med.Dose,
//         reduction: med.Dosage_Reduction,
//         route: med.Route,
//         instructions: med.Instructions,
//         administeredDoseMl: med.Administered_Dose_ml,
//         administeredDoseMg:med.Administered_Dose_mg
//       }));
//       info = {
//         cycleNumber: Cycle_Number, // Assuming cycleId corresponds to Cycle_Number
//         chemotherapyMedications: chemoMeds,
//       };
//       res.status(200).json(info);
//     })
//     .catch((err) => {
//       console.error("Error:", err.message);
//     });
//   };

exports.updateCycleAndMedications = (req, res, next) => {
  const { Cycle_Note, Cycle_Documentation_Date, Medications } = req.body;
  const patientId = req.params.id;
  let cycles; // Define cycles variable here

  // Find the patient by ID
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentPlan) => {
      if (!treatmentPlan) {
        return res.status(404).json({ error: 'Treatment plan not found' });
      }
      return treatmentPlan.getCycles();
    })
    .then((retrievedCycles) => {
      cycles = retrievedCycles; // Store cycles for later use
      const activeCycle = cycles.find((cycle) => cycle.Is_active);
      if (!activeCycle) {
        return res.status(404).json({ error: 'Active cycle not found' });
      }
      // deactivate current active cycle
      activeCycle.Is_active = false;
      if (Cycle_Note) {
        activeCycle.Cycle_note = Cycle_Note;
      }
      if (Cycle_Documentation_Date) {
        activeCycle.Cycle_Documentation_Date = Cycle_Documentation_Date;
      }
      return activeCycle.save();
    })
    .then((updatedCycle) => {
      // activate next cycle
      const nextCycle = cycles.find((cycle) => cycle.Cycle_Number === updatedCycle.Cycle_Number + 1);
      if (nextCycle) {
        nextCycle.Is_active = true; // Mark next cycle as active
        return nextCycle.save();
      }
      return Promise.resolve(); // Resolve without updating next cycle
    })
    .then(() => {
      // Update chemotherapy medications
      const updatePromises = Medications.map((med) => {
        const { ID, AdministeredDose_Ml, AdministeredDose_Mg } = med;
        if (!ID) {
          return Promise.reject({
            message: 'Medication ID is required for update',
          });
        }
        return ChemotherapyMedications.update(
          {
            Administered_Dose_ml: AdministeredDose_Ml,
            Administered_Dose_mg: AdministeredDose_Mg,
          },
          { where: { Chemotherapy_ID: ID } }
        ).catch((error) => {
          console.error('Error updating medication:', error.message);
          return Promise.reject({
            message: `Failed to update medication: ${ID}`,
          });
        });
      });

      return Promise.all(updatePromises);
    })
    .then(() => {
      res.status(200).json({ message: 'Cycle and medications updated successfully' });
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
};


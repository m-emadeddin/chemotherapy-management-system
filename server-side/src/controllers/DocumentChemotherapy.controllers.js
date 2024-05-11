// import models
const Patients = require("../models/index.models").Patients;
const Cycles = require("../models/index.models").Cycles;
const ChemotherapyMedications = require('../models/index.models').ChemotherapyMedications;


exports.getRegimenInfo = (req, res, next) => {
  const patientId = req.params.id;
  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      patient.getTreatmentPlan()
        .then((treatmentPlan) => {
          if (!treatmentPlan) {
            return res.status(404).json({ message: 'Treatment plan not found for this patient' });
          }
          const info = {
            cycleCount: treatmentPlan.number_of_Cycles,
            regimenName: treatmentPlan.Plan_Name
          };
          res.status(200).json(info);
        })
        .catch((treatmentPlanError) => {
          console.error('Error fetching treatment plan:', treatmentPlanError);
          res.status(500).json({ message: 'Internal server error' });
        });
    })
    .catch((patientError) => {
      console.error('Error fetching patient:', patientError);
      res.status(500).json({ message: 'Internal server error' });
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
        cycle_id: cycle.Cycle_ID,
        active_cycle: cycle.Is_active,
        cycle_note: cycle.cycle_note,
        documentation_date: cycle.updatedAt,
      }));
      // Construct the response object
      const responseObj = { cycles: cyclesInfo };
      // Send the response with the retrieved cycles
      res.status(200).json(responseObj);
    })
    .catch((error) => {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
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
        activeCycleId: activeCycle.Cycle_ID,
        activeCycleNumber: activeCycle.Cycle_Number,
        
      };
      // Send the response with the number and ID of the active cycle
      res.status(200).json(activeCycleInfo);
    })
    .catch((error) => {
      // Handle any unexpected errors
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
};
exports.getPremedications = (req, res, next) => {
  let info = {};
  const cycle_ID = req.params.id;
  Cycles.findByPk(cycle_ID)
    .then((cycle) => {
      if (!cycle) {
        throw new Error("Cycle not found");
      }
      // Retrieve premedications for the cycle
      return cycle.getPremedications().then((premedications) => {
        // Format premedications
        const formattedPremedications = premedications.map((premedication) => ({
          Medication: premedication.Medication_Name,
          Dose: premedication.Dose,
          Route: premedication.Route,
          Instructions: premedication.Instructions,
        }));

        // Send response
        info = {
          cycleNumber: cycle.Cycle_Number,
          premedications: formattedPremedications,
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
  const patientId = req.params.patientId;
  const cycleId = req.params.cycleId;

  Patients.findByPk(patientId)
    .then((patient) => {
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      return patient.getTreatmentPlan();
    })
    .then((treatmentPlan) => {
      if (!treatmentPlan) {
        return res.status(404).json({ message: "Treatment plan not found" });
      }
      // Find the specific cycle by ID
      return treatmentPlan.getCycles({ where: { Cycle_ID: cycleId } });
    })
    .then((cycles) => {
      if (!cycles || cycles.length === 0) {
        return res.status(404).json({ message: "Cycle not found" });
      }
      // Retrieve chemotherapy medications for the specific cycle
      return cycles[0].getChemotherapyMedications();
    })
    .then((chemotherapy) => {
      if (!Array.isArray(chemotherapy)) {
        throw new Error("Chemotherapy data not in the expected format");
      }
      const chemoMeds = chemotherapy.map((med) => ({
        name: med.Medication_Name,
        dose: med.Dose,
        reduction: med.Dosage_Reduction,
        route: med.Route,
        Instructions: med.Instructions,
        Administered_Dose_ml: med.Administered_Dose_ml,
      }));
      info = {
        cycleNumber: cycleId, // Assuming cycleId corresponds to Cycle_Number
        chemotherapyMedications: chemoMeds,
      };
      res.status(200).json(info);
    })
    .catch((err) => {
      console.error("Error:", err.message);
      // res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateCycleAndMedications = (req, res) => {
  const { cycleNote, cycleDocumentationDate, medications } = req.body;
  const cycleId = req.params.cycleId;

  // Update cycle information
  Cycles.findByPk(cycleId)
    .then((activeCycle) => {
      if (!activeCycle) {
        return res.status(404).json({ error: "Active cycle not found" });
      }

      // Update cycle note and documentation date if provided
      if (cycleNote) {
        activeCycle.Cycle_note = cycleNote;
      }
      if (cycleDocumentationDate) {
        activeCycle.Cycle_Documentation_Date = cycleDocumentationDate;
      }

      // Save the updated cycle
      return activeCycle.save();
    })
    .then(() => {
      // Update chemotherapy medications
      const updatePromises = medications.map((med) => {
        const { name, administeredDose_ml, administeredDose_mg } = med;
        if (!name) {
          return Promise.reject({ message: "Medication name is required for update" });
        }

        // Update specific fields of the medication by name
        return ChemotherapyMedications.update(
          {
            Administered_Dose_ml: administeredDose_ml,
            Administered_Dose_mg: administeredDose_mg
          },
          { where: { Medication_Name: name } }
        ).catch((error) => {
          // Handle individual medication update errors
          console.error("Error updating medication:", error.message);
          return Promise.reject({ message: `Failed to update medication: ${name}` });
        });
      });

      return Promise.all(updatePromises);
    })
    .then(() => {
      res.status(200).json({ message: "Cycle and medications updated successfully" });
    })
    .catch((error) => {
      // Handle any errors occurred during the update process
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    });
};

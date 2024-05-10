const db = require("../models/index.models");

exports.reviewChemotheraby = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    // check if patient already exists
    const patient = await db.Patients.findByPk(patientId);
    console.log(
      "================================================ True Patient================================"
    );
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    // create a new treatment plane for the patient
    const {
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
      PreMedications,
      ChemotherapyMedications,
      cycle_note,
    } = req.body;

    const treatmentPlan = await db.TreatmentPlans.create({
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
      patientPatientID: patient.Patient_ID,
    });
    console.log(
      "================================================ True TREATEMENT================================"
    );
    const cycle = await db.Cycles.create({
      Cycle_Number: treatmentPlan.number_of_Cycles,
      Start_Date: "2024-05-01",
      Start_Time: "08:00:00",
      End_Time: "17:00:00",
    });

    await Promise.all(
      PreMedications.map(async (medication) => {
        let pre = await db.Premedications.create({
          Medication_Name: medication.Medication_Name,
          Dose: medication.Dose,
          Route: medication.Route,
          Instructions: medication.Instructions,
        });
        await cycle.addPremedication(pre);
      })
    );
    console.log(
      "================================================ True pre================================"
    );
    await treatmentPlan.addCycles(cycle);
    await Promise.all(
      ChemotherapyMedications.map(async (medication) => {
        let med = await db.ChemotherapyMedications.create({
          Medication_Name: medication.Medication_Name,
          Dose: medication.Dose,
          Route: medication.Route,
          Instructions: medication.Instructions,
          Dosage_Reduction: medication.Dosage_Reduction,
          Administered_Dose_ml: medication.Administered_Dose_ml,
          Administered_Dose_mg: medication.Administered_Dose_mg,
          cycle_note,
        });
        await cycle.addChemotherapyMedications(med);
      })
    );
    console.log(
      "================================================ True medication================================"
    );
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

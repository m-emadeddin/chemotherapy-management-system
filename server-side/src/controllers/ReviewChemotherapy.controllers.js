const db = require("../models/index.models");

exports.reviewChemotheraby = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const patient = await db.Patients.findByPk(patientId);
    console.log("True Patient");
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const existingTreatmentPlan = await patient.getTreatmentPlan();
    if (existingTreatmentPlan) {
      return res.json({ message: "Patient already has a treatment plan" });
    }
    const {
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
      PreMedications,
      ChemotherapyMedications,
      Start_Date,
    } = req.body;

    const treatmentPlan = await db.TreatmentPlans.create({
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
      patientPatientID: patient.Patient_ID,
    });
    console.log("True Treatment");

    let days = Math.floor((number_of_Weeks * 7) / number_of_Cycles) || 1;
    await createCycles(
      number_of_Cycles,
      treatmentPlan,
      PreMedications,
      ChemotherapyMedications
    );
    async function createCycles(
      number_of_Cycles,
      treatmentPlan,
      PreMedications,
      ChemotherapyMedications
    ) {
      const cyclesPromises = [];
      for (let i = 1; i <= number_of_Cycles; i++) {
        const cyclePromise = createCycle(
          i,
          treatmentPlan,
          PreMedications,
          ChemotherapyMedications
        );
        cyclesPromises.push(cyclePromise);
      }
      await Promise.all(cyclesPromises);
    }

    async function createCycle(
      i,
      treatmentPlan,
      PreMedications,
      ChemotherapyMedications
    ) {
      const cycle = await db.Cycles.create({
        Cycle_Number: i,
        Is_active: i === 1 ? true : false,
        Start_Date: addWeeks(Start_Date, (i - 1) * days),
        Start_Time: "08:00:00",
        End_Time: "17:00:00",
      });
      await treatmentPlan.addCycles(cycle);
      await createPremedications(cycle, PreMedications);
      await createChemotherapyMedications(cycle, ChemotherapyMedications);
    }
      function addWeeks(date, days) {
      const resultDate = new Date(date);
      resultDate.setDate(resultDate.getDate() + days);
      return resultDate;
    }
    async function createPremedications(cycle, PreMedications) {
      const promises = PreMedications.map(async (medication) => {
        let pre = await db.Premedications.create({
          Medication_Name: medication.Medication_Name,
          Dose: medication.Dose,
          Route: medication.Route,
          Instructions: medication.Instructions,
        });
        await cycle.addPremedication(pre);
      });
      await Promise.all(promises);
    }

    async function createChemotherapyMedications(
      cycle,
      ChemotherapyMedications
    ) {
      const promises = ChemotherapyMedications.map(async (medication) => {
        let med = await db.ChemotherapyMedications.create({
          Medication_Name: medication.Medication_Name,
          Dose: medication.Dose,
          Route: medication.Route,
          Instructions: medication.Instructions,
          Dosage_Reduction: medication.Dosage_Reduction,
        });
        await cycle.addChemotherapyMedications(med);
      });
      await Promise.all(promises);
    }
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

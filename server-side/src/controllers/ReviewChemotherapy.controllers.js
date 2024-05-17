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
      physician_note
    } = req.body;

    const treatmentPlan = await db.TreatmentPlans.create({
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
      physician_note,
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



exports.getTreatmentPlan = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const patient = await db.Patients.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const treatmentPlan = await patient.getTreatmentPlan();
    if (!treatmentPlan) {
      return res.status(404).json({ error: "Treatment plan not found" });
    }

    const cycles = await treatmentPlan.getCycles({ limit: 1 });
    const premedications = await Promise.all(
      cycles.map(async (cycle) => {
        return await cycle.getPremedications({
          attributes: [
            "Medication_Name",
            "Dose",
            "Route",
            "Instructions",
          ],
        });
      })
    );
    const chemotherapyMedications = await Promise.all(
      cycles.map(async (cycle) => {
        return await cycle.getChemotherapyMedications({
          attributes: [
            "Medication_Name",
            "Dose",
            "Route",
            "Instructions",
            "Dosage_Reduction",
          ],
        });
      })
    );

    const formattedResponse = {
      Plan_Name: treatmentPlan.Plan_Name,
      number_of_Weeks: treatmentPlan.number_of_Weeks,
      number_of_Cycles: treatmentPlan.number_of_Cycles,
      physician_note: treatmentPlan.physician_note,

      Start_Date: cycles[0].Start_Date.toISOString().split("T")[0],
      PreMedications: premedications.flat().map((medication) => {
        const { Medication_Name, Dose, Route, Instructions } = medication.dataValues;
        return { Medication_Name, Dose, Route, Instructions };
      }),
      ChemotherapyMedications: chemotherapyMedications.flat().map((medication) => {
        const { Medication_Name, Dose, Route, Instructions, Dosage_Reduction } = medication.dataValues;
        return {
          Medication_Name,
          Dose,
          Route,
          Instructions,
          Dosage_Reduction,
        };
      }),
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
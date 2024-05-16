const db = require("../models/index.models");

exports.reviewChemotheraby = async (req, res, next) => {
  try {
    // Define patient id
    const { patientId } = req.params;
    const patient = await db.Patients.findByPk(patientId);
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
    // create a new Treatment Plan
    const treatmentPlan = await patient.createTreatmentPlan({
      Plan_Name,
      number_of_Weeks,
      number_of_Cycles,
    });
    // define number of days for one cycle
    let days = Math.floor((number_of_Weeks * 7) / number_of_Cycles) || 1;
    // define start date for cycle
    function addDays(date, days) {
      const resultDate = new Date(date);
      resultDate.setDate(resultDate.getDate() + days);
      return resultDate;
    }
    // Create Cycles
    let Cycles = await Promise.all(
      [...new Array(number_of_Cycles)].map( async function (_, index) {
      let cycle =   await db.Cycles.create({
        Cycle_Number: index + 1,
        Is_active: index === 0 ? true : false,
        Start_Date:addDays(Start_Date, index * days),
        Start_Time: "08:00:00",
        End_Time: "17:00:00",
      });
      return cycle;
    }))
    // Create Premedications
    const premedications = await Promise.all(
      PreMedications.map(async (premedication) =>{
      let preMedication = await db.Premedications.create({
        Medication_Name: premedication.Medication_Name,
        Dose: premedication.Dose,
        Route: premedication.Route,
        Instructions: premedication.Instructions,
      });
      return preMedication
    }))
    // Create Chemotherapy Medications  
    const chemotherapyMedications = await Promise.all(ChemotherapyMedications.map(async (chemotherapymedication) =>{
      let ChemotherapyMedication = await db.ChemotherapyMedications.create({
        Medication_Name: chemotherapymedication.Medication_Name,
        Dose: chemotherapymedication.Dose,
        Route: chemotherapymedication.Route,
        Instructions: chemotherapymedication.Instructions,
        Dosage_Reduction: chemotherapymedication.Dosage_Reduction,
      });
      return ChemotherapyMedication
    }))
    // add cycles to treatment plane
    await treatmentPlan.addCycles(Cycles)

    // add premedications to cycles
    await Promise.all(
      Cycles.map(async (cycle) => {
        return await cycle.addPremedications(premedications);
      })
    );

    // add chemotherapy medications to cycles
    await Promise.all(
      Cycles.map(async (cycle) => {
        return await cycle.addChemotherapyMedications(chemotherapyMedications);
      })
    );
    // send response 
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

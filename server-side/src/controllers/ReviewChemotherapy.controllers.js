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
      [...new Array(number_of_Cycles)].map(async function (_, index) {
        let cycle = await treatmentPlan.createCycle({
          Cycle_Number: index + 1,
          Is_active: index === 0 ? true : false,
          Start_Date: addDays(Start_Date, index * days),
          Start_Time: "08:00:00",
          End_Time: "17:00:00",
        });
        return cycle;
      })
    );
    // Create Premedications
    await Promise.all(
      Cycles.map(async (cycle) => {
        await Promise.all(
          PreMedications.map(async (premedication) => {
            await cycle.createPremedication({
              Medication_Name: premedication.Medication_Name,
              Dose: premedication.Dose,
              Route: premedication.Route,
              Instructions: premedication.Instructions,
            });
          })
        );
      })
    );
    // Create Chemotherapy Medications
    await Promise.all(
      Cycles.map(async (cycle) => {
        await Promise.all(
          ChemotherapyMedications.map(async (chemotherapymedication) => {
            await cycle.createChemotherapyMedication({
              Medication_Name: chemotherapymedication.Medication_Name,
              Dose: chemotherapymedication.Dose,
              Route: chemotherapymedication.Route,
              Instructions: chemotherapymedication.Instructions,
              Dosage_Reduction: chemotherapymedication.Dosage_Reduction,
            });
          })
        );
      })
    );

    // send response
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

    const cycles = await treatmentPlan.getCycles({
      where: { Cycle_Number: 1 },
      order: [["Cycle_Number", "ASC"]],
    });

    const startCycle = cycles[0]; // Get the first cycle directly
    const startDate = startCycle
      ? startCycle.Start_Date.toISOString().split("T")[0]
      : null;

    const premedications = await startCycle.getPremedications({
      attributes: ["Medication_Name", "Dose", "Route", "Instructions"],
    });

    const chemotherapyMedications = await startCycle.getChemotherapyMedications(
      {
        attributes: [
          "Medication_Name",
          "Dose",
          "Route",
          "Instructions",
          "Dosage_Reduction",
        ],
      }
    );

    const formattedResponse = {
      Plan_Name: treatmentPlan.Plan_Name,
      number_of_Weeks: treatmentPlan.number_of_Weeks,
      number_of_Cycles: treatmentPlan.number_of_Cycles,
      physician_note: treatmentPlan.physician_note,
      Start_Date: startDate,
      PreMedications: premedications.map((medication) => {
        const { Medication_Name, Dose, Route, Instructions } =
          medication.dataValues;
        return { Medication_Name, Dose, Route, Instructions };
      }),
      ChemotherapyMedications: chemotherapyMedications.map((medication) => {
        const { Medication_Name, Dose, Route, Instructions, Dosage_Reduction } =
          medication.dataValues;
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

const {
  treatmentPlanReadOnly,
  Cycles,
  CancerOverview,
  ChemotherapyMedications,
  Patients,
  ReservedBeds,
  VitalSign,
  Premedications,
  TreatmentPlans,
  Radiography,
  Medical,
  User,
  Doctor,
  Visits,
  CycleRead,
  ChemotherapyMedRead,
  PremedicationRead,
  SideEffects,

} = require('../models/index.models');

// Insert data into tables
// Define function to insert data # canceroverview has many treatmentplans -- with composite key
exports.insertData = () => {
  let cancerOverviewInstance;
  let treatmentPlanInstance;

  return (
    CancerOverview.create({
      Stage: 'Stage41',
      Cancer_type: 'Type15',
      Note_On_cancer: 'Dummy for Type1 Stage1',
    })
      .then((cancerOverview) => {
        cancerOverviewInstance = cancerOverview;
        return treatmentPlanReadOnly.create({
          Plan_Name: 'Plan8',
          number_of_Weeks: 5,
          number_of_Cycles: 6,
        });
      })
      .then((treatmentPlan) => {
        treatmentPlanInstance = treatmentPlan;
        console.log(treatmentPlan.toJSON());

        // Associate treatmentPlanReadOnly with CancerOverview
        return treatmentPlanInstance.update({
          CancerOverview_Stage: cancerOverviewInstance.Stage,
          CancerOverview_Cancer_type: cancerOverviewInstance.Cancer_type,
        });
      })
      // .then(() => {
      //   // Associate CancerOverview with treatmentPlanReadOnly in reverse direction
      //   return cancerOverviewInstance.addTreatmentPlanReadOnly(treatmentPlanInstance);
      // })
      .then(() => {
        console.log('Associations established successfully');
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      })
  );
};
// Insert dummy data function
exports.insertDummyData = async () => {
  try {
    //===========================PATIENTS=============================================================
    const patient1 = await Patients.create({
      Name: 'Mohamed',
      Age: 55,
      Gender: 'Male',
      date_of_birth: '1990-05-15', // Example date, format: 'YYYY-MM-DD'
      nationality: 'US',
      blood_type: 'O+',
      disease_type: 'None',
      street: '123 Main St',
      city: 'Anytown',
      governorate: 'AnyGov',
      mobile: '123-456-7890',
      verified: false,
    });

    const patient2 = await Patients.create({
      Name: 'Mariam',
      Age: 53,
      Gender: 'Female',
      date_of_birth: '1985-10-20', // Example date, format: 'YYYY-MM-DD'
      nationality: 'UK',
      blood_type: 'A-',
      disease_type: 'Diabetes',
      street: '456 Elm St',
      city: 'OtherCity',
      governorate: 'OtherGov',
      mobile: '987-654-3210',
      verified: false,
    });

    //===========================TREATMENT PLAN=============================================================
    const Treatmentplan1 = await patient1.createTreatmentPlan({
      Plan_Name: 'CHPO',
      number_of_Cycles: 2,
      number_of_Weeks: 5,
    });
    const Treatmentplan2 = await patient2.createTreatmentPlan({
      Plan_Name: 'chemotherapy2',
      number_of_Cycles: 4,
      number_of_Weeks: 4,
    });
    //===========================VITAL SIGNS=============================================================

    await patient1.createVitalSign({
      Blood_Pressure: 120.0,
      Height: 170.0,
      Weight: 70.0,
      Heart_rate: 72.0,
      BMI: 24.2,
      Temp: 37,
      Chief_Complaint: 'Headache',
    });

    await patient2.createVitalSign({
      Blood_Pressure: 130.0,
      Height: 165.0,
      Weight: 65.0,
      Heart_rate: 80.0,
      BMI: 23.9,
      Temp: 40,
      Chief_Complaint: 'Fever',
    });
    //===========================SIDE EFFECTS==========================================================
    await patient1.createSideEffect(
      {
        Nausea: 'High',
        Loss_of_appetite: 'Low',
        Hair_loss: 'Moderate',
        Gastrointestinal_disturbances: 'High',
        Loss_of_memory: 'Low',
        Skin_change: 'Moderate',
        Blood_cell_loss: 'High',
        Psychological_effects: 'Low',
        Changes_in_kidney_and_liver_function: 'Moderate',
      },
      {
        through: {
          Date: '2024-05-06 08:00:00',
        },
      }
    );
    await patient2.createSideEffect(
      {
        Nausea: 'Low',
        Loss_of_appetite: 'High',
        Hair_loss: 'High',
        Gastrointestinal_disturbances: 'Low',
        Loss_of_memory: 'Moderate',
        Skin_change: 'High',
        Blood_cell_loss: 'Moderate',
        Psychological_effects: 'High',
        Changes_in_kidney_and_liver_function: 'Low',
      },
      {
        through: {
          Date: '2024-05-06 08:00:00',
        },
      }
    );
    //===========================RADIOGRAPHY=============================================================
    await patient1.createRadiography({
      MRI: 'MRI1',
      CT: 'CT',
      PET_CT: 'PET-CT1',
      Ultrasound: 'Ultrasound1',
      XRay: 'X-Ray1',
      Mammography: 'Mammography 1',
      DEXA: 'DEXA1',
    });

    await patient2.createRadiography({
      MRI: 'MRI Result 2',
      CT: 'CT Result 2',
      PET_CT: 'PET-CT Result 2',
      Ultrasound: 'Ultrasound Result 2',
      XRay: 'X-Ray Result 2',
      Mammography: 'Mammography Result 2',
      DEXA: 'DEXA Result 2',
    });
    //===========================MEDICAL ANALYSIS=============================================================
    await patient1.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'Normal',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 15,
      createdAt: new Date(),
    });
    await patient2.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 10,
      createdAt: new Date(),
    });
    //===========================CANCER OVERVIEW=============================================================

    const cancerOverview1 = await patient1.createCancerOverview({
      Stage: 'Stage1',
      Cancer_type: 'Non-Hodgkin Lymphoma',
      Note_On_cancer: 'Note for cancer data 1',
    });

    const cancerOverview2 = await patient2.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Pancreatic Cancer',
      Note_On_cancer: 'Note for cancer data 2',
    });
    //===========================VISITS=============================================================
    await patient1.createVisit({
      visit_time: new Date('2024-05-06 08:00:00'),
    });

    await patient2.createVisit({
      visit_time: new Date('2024-05-07 09:00:00'),
    });
    //===========================RESERVED BEDS=============================================================
    const bed1 = await ReservedBeds.create({
      Availability_Status: 1,
      Bed_ID: 103,
    });
    const bed2 = await ReservedBeds.create({
      Availability_Status: 1,
      Bed_ID: 781,
    });
    //===========================CYCLES=============================================================
    const cycle1 = await Cycles.create({
      Cycle_Number: 1,
      Start_Date: '2024-05-01',
      Start_Time: '08:00:00',
      End_Time: '17:00:00',
      cycle_note:'all is good'
    });
    const cycle2 = await Cycles.create({
      Cycle_Number: 2,
      Start_Date: '2024-06-01',
      Start_Time: '08:00:00',
      End_Time: '17:00:00',
      Is_active:false,
      cycle_note:'👍👍👍👍👍',
      
    });
    const cycle3 = await Cycles.create({
      Cycle_Number: 1,
      Start_Date: '2024-07-01',
      Start_Time: '08:00:00',
      End_Time: '17:00:00',
      Is_active:true,
      cycle_note:'💔💔💔💔'
    });
    const cycle4 = await Cycles.create({
      Cycle_Number: 2,
      Start_Date: '2024-10-01',
      Start_Time: '08:00:00',
      End_Time: '17:00:00',
      cycle_note:'still alive'
    });
    //===========================PRE MEDICATIONS=============================================================
    const premed1 = await Premedications.create({
      Medication_Name: 'Premed A',
      Dose: 10,
      Route: 'Oral',
      Instructions: 'Take before chemotherapy',
    });
    const premed2 = await Premedications.create({
      Medication_Name: 'Premed B',
      Dose: 20,
      Route: 'Intravenous',
      Instructions: 'Administer slowly',
    });
    const premed3 = await Premedications.create({
      Medication_Name: 'Premed C',
      Dose: 35,
      Route: 'Oral',
      Instructions: 'Take before chemotherapy',
    });
    const premed4 = await Premedications.create({
      Medication_Name: 'Premed D',
      Dose: 40,
      Route: 'Intravenous',
      Instructions: 'Administer slowly',
    });
    //===========================CHEMOTHERAPY MEDICATIONS=============================================================
    const chemotherapy1 = await ChemotherapyMedications.create({
      Medication_Name: 'Drug A',
      Dose: 100,
      Route: 'Intravenous',
      Instructions: 'Administer over 2 hours',
      Dosage_Reduction: 0,
      Administered_Dose_ml: 100,
      Administered_Dose_mg: 20,
    });
    const chemotherapy2 = await ChemotherapyMedications.create({
      Medication_Name: 'Drug B',
      Dose: 58,
      Route: 'Oral',
      Instructions: 'Take with food',
      Dosage_Reduction: 25,
      Administered_Dose_ml: 90,
      Administered_Dose_mg: 30,
    });
    const chemotherapy3 = await ChemotherapyMedications.create({
      Medication_Name: 'Drug C',
      Dose: 580,
      Route: 'Intravenous',
      Instructions: 'Administer over 2 hours',
      Dosage_Reduction: 0,
      Administered_Dose_ml: 100,
      Administered_Dose_mg: 20,
    });
    const chemotherapy4 = await ChemotherapyMedications.create({
      Medication_Name: 'Drug D',
      Dose: 250,
      Route: 'Oral',
      Instructions: 'Take with food',
      Dosage_Reduction: 25,
      Administered_Dose_ml: 90,
      Administered_Dose_mg: 30,
    });
    //===========================DOCTOR=============================================================
    const doctor1 = await Doctor.create({
      speciality: 'Cardiologist',
      license_number: '12345',
      id_profile: 1,
    });
    const doctor2 = await Doctor.create({
      speciality: 'Dermatologist',
      license_number: '67890',
      id_profile: 2,
    });
    //===========================USER=============================================================
    await doctor1.createUser({
      Username: 'Alaa',
      Password: 'Lolo',
      Email: 'alaawahbaa13@gmail.com',
      is_admin: true,
    });
    await doctor2.createUser({
      Username: 'Halimo',
      Password: 'admin',
      Email: 'halimo@gmail.com',
      is_admin: true,
    });
    // Associate patient with Treatmentplans

    // Associate Treatment plans with cycles (many-to-many)
    await Treatmentplan1.addCycles([cycle1, cycle2]);
    await Treatmentplan2.addCycles([cycle3, cycle4]);

    // Association cycles with premedication
    await cycle1.addPremedication([premed1, premed2]);
    await cycle2.addPremedication([premed3, premed1]);

    // for patient 2
    await cycle3.addPremedication([premed4, premed1]);
    await cycle4.addPremedication([premed4, premed3]);

    // Associate Cycles with ChemotherapyMedications
    // patient 1
    await cycle1.addChemotherapyMedication([chemotherapy1, chemotherapy3]);
    await cycle2.addChemotherapyMedication([chemotherapy1, chemotherapy2]);
    // patient 2
    await cycle3.addChemotherapyMedication([chemotherapy4, chemotherapy1]);
    await cycle4.addChemotherapyMedication([chemotherapy4, chemotherapy2]);

    // Associate patient with Reserved beds
    await patient1.addReservedbeds(bed1, {
      through: {
        ReservationDate: '2024-05-06 08:00:00',
        HoursReserved: 3,
      },
    });
    await patient1.addReservedbeds(bed2, {
      through: {
        ReservationDate: '2023-05-06 08:00:00',
        HoursReserved: 5,
      },
    });
    await patient2.addReservedbeds(bed1, {
      through: {
        ReservationDate: '2024-05-07 08:00:00',
        HoursReserved: 2,
      },
    });
    await patient2.addReservedbeds(bed2, {
      through: {
        ReservationDate: '2024-08-07 08:00:00',
        HoursReserved: 8,
      },
    });
    console.log('Dummy data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};

exports.insertRegimens = async () => {
  try {
    //=====================CPOH =======================================================
    // Step 1: Insert treatmentplanreadonly  data
    const treatmentPlanreadonly1 = await treatmentPlanReadOnly.create({
      Plan_Name: 'CHOP: Protocol for Non-Hodgkin Lymphoma',
      number_of_Weeks: 3,
      number_of_Cycles: 6,
      Cancer_Type: 'Non-Hodgkin Lymphoma',
    });

    // Step 3: Insert premedication data
    const premedicationsInserted = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'oral',
        Instructions: 'Once 60 minutes before chemotherapy',
      },
      {
        Medication_Name: 'Sodium chloride',
        Dose: 1000,
        Route: 'Intravenous',
        Instructions: 'Once prior to chemotherapy',
      },
    ]);

    // Step 4: Insert chemotherapy data
    const chemotherapyInserted = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Cyclophosphamide',
        Dose: 750,
        Route: 'Intravenous',
        Instructions: 'IV Push over 1-2 hours',
      },
      {
        Medication_Name: 'Doxorubicin',
        Dose: 50,
        Route: 'Intravenous',
        Instructions: 'IV Push over 15 minutes',
      },
      {
        Medication_Name: 'Prednisone',
        Dose: 100,
        Route: 'oral',
        Instructions:
          'Daily x 5 days. 1st dose 60 minutes prior to chemotherapy',
        Dosage_Reduction: null,
        Administered_Dose_ml: null,
        Administered_Dose_mg: null,
        cycle_note: null,
      },
      {
        Medication_Name: 'Vincristine',
        Dose: 1.4,
        Route: 'Intravenous',
        Instructions: 'IV Push over 1-2 minutes',
      },
    ]);

    // Step 5: Associate treatment plan with  premedications, and chemotherapy
    await treatmentPlanreadonly1.setPremedicationReads(premedicationsInserted);
    await treatmentPlanreadonly1.setChemotherapyMedReads(chemotherapyInserted);

    // 2 =====================================ABVD==========================================
    // Step 1: Insert treatment plan data
    const treatmentPlanreadonly2 = await treatmentPlanReadOnly.create({
      Plan_Name: 'ABVD Hodgkin Lymphoma Regimen',
      number_of_Weeks: 4,
      number_of_Cycles: 7,
      Cancer_Type: 'Hodgkin Lymphoma',
    });
    // Step 3: Insert premedication data
    const premedicationsInserted2 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Granisetron',
        Dose: 1,
        Route: 'Oral or Intravenous',
        Instructions:
          'Administered before chemotherapy to prevent nausea and vomiting.',
      },
    ]);

    // Step 4: Insert chemotherapy data
    const chemotherapyInserted2 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Doxorubicin (Adriamycin)',
        Dose: 25,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as a slow IV infusion over 15-30 minutes.',
      },
      {
        Medication_Name: 'Bleomycin',
        Dose: 10,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as a slow IV infusion over 10-15 minutes.',
      },
      {
        Medication_Name: 'Vinblastine',
        Dose: 6,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as a slow IV infusion over 5-10 minutes.',
      },
      {
        Medication_Name: 'Dacarbazine',
        Dose: 375,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as a slow IV infusion over 30-60 minutes.',
      },
    ]);

    // Step 5: Associate treatment plan premedications, and chemotherapy
    await treatmentPlanreadonly2.setPremedicationReads(premedicationsInserted2);
    await treatmentPlanreadonly2.setChemotherapyMedReads(chemotherapyInserted2);
    // =====================================COP==========================================
    // Step 1: Create treatment plan
    const treatmentPlanreadonly3 = await treatmentPlanReadOnly.create({
      Plan_Name: 'COP Regimen for Non-Metastatic Non-Hodgkin Lymphoma',
      number_of_Weeks: 3,
      number_of_Cycles: 6,
      Cancer_Type: 'Non-Hodgkin Lymphoma',
    });

    // Step 3: Insert premedication data
    const premedicationsInserted3 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Prednisone',
        Dose: 40,
        Route: 'Oral',
        Instructions:
          'Administered before chemotherapy as part of the COP regimen. Dosage and frequency may vary based on patient factors and treatment protocol.',
      },
    ]);

    // Step 4: Insert chemotherapy data
    const chemotherapyInserted3 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Cyclophosphamide',
        Dose: 750,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as part of the COP regimen. Dosage and frequency may vary based on patient factors and treatment protocol.',
      },
      {
        Medication_Name: 'Vincristine',
        Dose: 1.4,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each cycle as part of the COP regimen. Dosage and frequency may vary based on patient factors and treatment protocol.',
      },
    ]);

    // Step 5: Associate treatment plan premedications, and chemotherapy
    await treatmentPlanreadonly3.setPremedicationReads(premedicationsInserted3);
    await treatmentPlanreadonly3.setChemotherapyMedReads(chemotherapyInserted3);

    // 4 // ===================================FOLFIRINOX========================================

    //   // Step 1: Create treatment plan
    const treatmentPlanreadonly4 = await treatmentPlanReadOnly.create({
      Plan_Name: 'FOLFIRINOX Regimen for Pancreatic Cancer',
      number_of_Weeks: 24,
      number_of_Cycles: 8,
      Cancer_Type: 'Pancreatic Cancer',
    });

    // Step 3: Insert premedication data
    const premedicationsInserted4 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'Oral or Intravenous',
        Instructions:
          'Administered before chemotherapy to prevent nausea and vomiting.',
      },
    ]);

    // Step 4: Insert chemotherapy data
    const chemotherapyInserted4 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Oxaliplatin',
        Dose: 85,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each 14-day cycle as part of the FOLFIRINOX regimen. Infuse over 2 hours.',
      },
      {
        Medication_Name: 'Irinotecan',
        Dose: 180,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each 14-day cycle as part of the FOLFIRINOX regimen. Infuse over 90 minutes.',
      },
      {
        Medication_Name: 'Leucovorin (Folinic Acid)',
        Dose: 400,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1 of each 14-day cycle as part of the FOLFIRINOX regimen. Infuse over 2 hours, starting 30 minutes before fluorouracil infusion.',
      },
      {
        Medication_Name: 'Fluorouracil (5-FU)',
        Dose: 2400,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1-2 of each 14-day cycle as part of the FOLFIRINOX regimen. Administered as an intravenous bolus over 46-48 hours via continuous infusion pump.',
      },
    ]);

    // Step 5: Associate treatment plan premedications, and chemotherapy
    await treatmentPlanreadonly4.setPremedicationReads(premedicationsInserted4);
    await treatmentPlanreadonly4.setChemotherapyMedReads(chemotherapyInserted4);

    // 5-==============================Gemcitabine + Abraxane===================================
    // Step 1: Create treatment plan
    const treatmentPlanreadonly5 = await treatmentPlanReadOnly.create({
      Plan_Name: 'Gemcitabine + Abraxane Therapy for Pancreatic Cancer',
      number_of_Weeks: 18,
      number_of_Cycles: 6,
      Cancer_Type: 'Pancreatic Cancer',
    });

    // Step 3: Insert premedication data
    const premedicationsInserted5 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'Oral or Intravenous',
        Instructions:
          'Administered before chemotherapy to prevent nausea and vomiting.',
      },
    ]);

    // Step 4: Insert chemotherapy data
    const chemotherapyInserted5 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Gemcitabine',
        Dose: 1000,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1, Day 8, and Day 15 of each 28-day cycle as part of the Gemcitabine + Abraxane therapy.',
      },
      {
        Medication_Name: 'Abraxane (Nab-paclitaxel)',
        Dose: 125,
        Route: 'Intravenous',
        Instructions:
          'Administered on Day 1, Day 8, and Day 15 of each 28-day cycle as part of the Gemcitabine + Abraxane therapy.',
      },
    ]);

    // Step 5: Associate treatment plan premedications, and chemotherapy
    await treatmentPlanreadonly5.setPremedicationReads(premedicationsInserted5);
    await treatmentPlanreadonly5.setChemotherapyMedReads(chemotherapyInserted5);

    console.log('Regimns inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

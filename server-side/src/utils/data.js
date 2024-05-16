const {
  treatmentPlanReadOnly,
  Cycles,
  CancerOverview,
  ChemotherapyMedications,
  Patients,
  VitalSign,
  Premedications,
  TreatmentPlans,
  Radiography,
  Medical,
  User,
  Doctor,
  CycleRead,
  ChemotherapyMedRead,
  PremedicationRead,
  SideEffects,

} = require('../models/index.models');

// Insert data into tables

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
      city: 'Alexandria',
      governorate: 'Alexandria',
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
      city: 'Cairo',
      governorate: 'Cairo',
      mobile: '987-654-3210',
      verified: false,
    });

    const patient3 = await Patients.create({
      Name: 'Ahmed',
      Age: 27,
      Gender: 'Male',
      date_of_birth: '1997-03-23', 
      nationality: 'EGY',
      blood_type: 'A+',
      disease_type: 'Diabetes',
      street: '456 Elm St',
      city: 'Zagazig',
      governorate: 'Sharqia',
      mobile: '430-524-2261',
      verified: false,
    });

    const patient4 = await Patients.create({
      Name: 'Mohamed',
      Age: 35,
      Gender: 'Male',
      date_of_birth: '1989-05-10', 
      nationality: 'EGY',
      blood_type: 'B-',
      disease_type: 'Hypertension',
      street: '123 Nile Street',
      city: 'Cairo',
      governorate: 'Cairo',
      mobile: '0101-234-5678',
      verified: true,
    });
    
    const patient5 = await Patients.create({
      Name: 'Fatima',
      Age: 42,
      Gender: 'Female',
      date_of_birth: '1982-12-17', 
      nationality: 'EGY',
      blood_type: 'O+',
      disease_type: 'Asthma',
      street: '789 Pyramids Street',
      city: 'Giza',
      governorate: 'Giza',
      mobile: '0111-345-6789',
      verified: false,
    });
    
    const patient6 = await Patients.create({
      Name: 'Youssef',
      Age: 29,
      Gender: 'Male',
      date_of_birth: '1995-08-25', 
      nationality: 'EGY',
      blood_type: 'AB+',
      disease_type: 'Heart Disease',
      street: '456 Nile Street',
      city: 'Alexandria',
      governorate: 'Alexandria',
      mobile: '0122-456-7890',
      verified: true,
    });
    
    const patient7 = await Patients.create({
      Name: 'Sarah',
      Age: 38,
      Gender: 'Female',
      date_of_birth: '1986-04-30', 
      nationality: 'EGY',
      blood_type: 'A-',
      disease_type: 'Arthritis',
      street: '101 Khalil Street',
      city: 'Ismailia',
      governorate: 'Ismailia',
      mobile: '0100-987-6543',
      verified: false,
    });

    const patient8 = await Patients.create({
      Name: 'Ahmed',
      Age: 45,
      Gender: 'Male',
      date_of_birth: '1979-09-15', 
      nationality: 'EGY',
      blood_type: 'A+',
      disease_type: 'Diabetes',
      street: '789 Nile Street',
      city: 'Luxor',
      governorate: 'Luxor',
      mobile: '0102-345-6789',
      verified: true,
    });
    
    const patient9 = await Patients.create({
      Name: 'Aisha',
      Age: 31,
      Gender: 'Female',
      date_of_birth: '1993-07-28', 
      nationality: 'EGY',
      blood_type: 'B+',
      disease_type: 'Migraine',
      street: '456 Ramses Street',
      city: 'Aswan',
      governorate: 'Aswan',
      mobile: '0111-987-6543',
      verified: false,
    });
    
    const patient10 = await Patients.create({
      Name: 'Omar',
      Age: 50,
      Gender: 'Male',
      date_of_birth: '1974-12-05', 
      nationality: 'EGY',
      blood_type: 'O-',
      disease_type: 'High Cholesterol',
      street: '101 Pharaohs Street',
      city: 'Sharm El Sheikh',
      governorate: 'South Sinai',
      mobile: '0100-123-4567',
      verified: true,
    });
    

    //===========================TREATMENT PLAN=============================================================
    // const Treatmentplan1 = await patient1.createTreatmentPlan({
    //   Plan_Name: 'CHPO',
    //   number_of_Cycles: 2,
    //   number_of_Weeks: 5,
    // });
    // const Treatmentplan2 = await patient2.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy2',
    //   number_of_Cycles: 2,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan3 = await patient3.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy3',
    //   number_of_Cycles: 3,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan4 = await patient4.createTreatmentPlan({
    //   Plan_Name: 'chemotherap4',
    //   number_of_Cycles: 4,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan5 = await patient5.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy5',
    //   number_of_Cycles: 5,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan6 = await patient6.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy6',
    //   number_of_Cycles: 4,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan7 = await patient7.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy7',
    //   number_of_Cycles: 3,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan8 = await patient8.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy8',
    //   number_of_Cycles: 2,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan9 = await patient9.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy9',
    //   number_of_Cycles: 4,
    //   number_of_Weeks: 4,
    // });
    // const Treatmentplan10 = await patient10.createTreatmentPlan({
    //   Plan_Name: 'chemotherapy10',
    //   number_of_Cycles: 4,
    //   number_of_Weeks: 4,
    // });
    
    //===========================VITAL SIGNS=============================================================
     // Add vital signs for patient1
      await patient1.createVitalSign({
        Blood_Pressure: 120.0,
        Height: 170.0,
        Weight: 70.0,
        Heart_rate: 72.0,
        BMI: 24.2,
        Temp: 37,
        Chief_Complaint: 'Headache',
      });

      await patient1.createVitalSign({
        Blood_Pressure: 122.0,
        Height: 168.0,
        Weight: 71.0,
        Heart_rate: 70.0,
        BMI: 24.8,
        Temp: 37.1,
        Chief_Complaint: 'Dizziness',
      });

      // Add vital signs for patient2
      await patient2.createVitalSign({
        Blood_Pressure: 130.0,
        Height: 165.0,
        Weight: 65.0,
        Heart_rate: 80.0,
        BMI: 23.9,
        Temp: 40,
        Chief_Complaint: 'Fever',
      });

      await patient2.createVitalSign({
        Blood_Pressure: 128.0,
        Height: 163.0,
        Weight: 63.0,
        Heart_rate: 78.0,
        BMI: 23.5,
        Temp: 39.5,
        Chief_Complaint: 'Chills',
      });

      await patient2.createVitalSign({
        Blood_Pressure: 138.0,
        Height: 163.0,
        Weight: 60.0,
        Heart_rate: 59.0,
        BMI: 14.5,
        Temp: 39.5,
        Chief_Complaint: 'Chills',
      });

      await patient2.createVitalSign({
        Blood_Pressure: 119.0,
        Height: 163.0,
        Weight: 59.0,
        Heart_rate: 80.0,
        BMI: 27.5,
        Temp: 42.5,
        Chief_Complaint: 'Dizziness',
      });

      // Add vital signs for patient3
      await patient3.createVitalSign({
        Blood_Pressure: 118.0,
        Height: 172.0,
        Weight: 72.0,
        Heart_rate: 70.0,
        BMI: 24.5,
        Temp: 36.9,
        Chief_Complaint: 'Fatigue',
      });

      await patient3.createVitalSign({
        Blood_Pressure: 122.0,
        Height: 170.0,
        Weight: 73.0,
        Heart_rate: 68.0,
        BMI: 24.1,
        Temp: 37.0,
        Chief_Complaint: 'Nausea',
      });

      await patient3.createVitalSign({
        Blood_Pressure: 118.0,
        Height: 172.0,
        Weight: 72.0,
        Heart_rate: 70.0,
        BMI: 24.5,
        Temp: 36.9,
        Chief_Complaint: 'Fatigue',
      });

      await patient3.createVitalSign({
        Blood_Pressure: 122.0,
        Height: 170.0,
        Weight: 73.0,
        Heart_rate: 68.0,
        BMI: 24.1,
        Temp: 37.0,
        Chief_Complaint: 'Nausea',
      });

      await patient3.createVitalSign({
        Blood_Pressure: 120.0,
        Height: 171.0,
        Weight: 71.0,
        Heart_rate: 72.0,
        BMI: 24.3,
        Temp: 36.8,
        Chief_Complaint: 'Insomnia',
      });

      // Add vital signs for patient4
      await patient4.createVitalSign({
        Blood_Pressure: 125.0,
        Height: 168.0,
        Weight: 69.0,
        Heart_rate: 75.0,
        BMI: 24.6,
        Temp: 37.2,
        Chief_Complaint: 'Abdominal pain',
      });

      await patient4.createVitalSign({
        Blood_Pressure: 123.0,
        Height: 166.0,
        Weight: 67.0,
        Heart_rate: 73.0,
        BMI: 24.4,
        Temp: 37.1,
        Chief_Complaint: 'Back pain',
      });

      // Add vital signs for patient5
      await patient5.createVitalSign({
        Blood_Pressure: 115.0,
        Height: 168.0,
        Weight: 70.0,
        Heart_rate: 75.0,
        BMI: 24.8,
        Temp: 37.2,
        Chief_Complaint: 'Back pain',
      });

      await patient5.createVitalSign({
        Blood_Pressure: 118.0,
        Height: 169.0,
        Weight: 71.0,
        Heart_rate: 74.0,
        BMI: 24.6,
        Temp: 37.1,
        Chief_Complaint: 'Headache',
      });

      await patient5.createVitalSign({
        Blood_Pressure: 116.0,
        Height: 170.0,
        Weight: 72.0,
        Heart_rate: 73.0,
        BMI: 24.7,
        Temp: 37.0,
        Chief_Complaint: 'Fatigue',
      });

      await patient5.createVitalSign({
        Blood_Pressure: 114.0,
        Height: 171.0,
        Weight: 73.0,
        Heart_rate: 72.0,
        BMI: 24.5,
        Temp: 36.9,
        Chief_Complaint: 'Nausea',
      });

      await patient5.createVitalSign({
        Blood_Pressure: 117.0,
        Height: 172.0,
        Weight: 74.0,
        Heart_rate: 71.0,
        BMI: 24.4,
        Temp: 36.8,
        Chief_Complaint: 'Insomnia',
      });

      // Add vital signs for patient6
      await patient6.createVitalSign({
        Blood_Pressure: 120.0,
        Height: 170.0,
        Weight: 70.0,
        Heart_rate: 72.0,
        BMI: 24.2,
        Temp: 37.0,
        Chief_Complaint: 'Headache',
      });

      await patient6.createVitalSign({
        Blood_Pressure: 122.0,
        Height: 171.0,
        Weight: 71.0,
        Heart_rate: 71.0,
        BMI: 24.3,
        Temp: 36.9,
        Chief_Complaint: 'Back pain',
      });

      await patient6.createVitalSign({
        Blood_Pressure: 124.0,
        Height: 172.0,
        Weight: 72.0,
        Heart_rate: 70.0,
        BMI: 24.4,
        Temp: 36.8,
        Chief_Complaint: 'Fatigue',
      });

      await patient6.createVitalSign({
        Blood_Pressure: 126.0,
        Height: 173.0,
        Weight: 73.0,
        Heart_rate: 69.0,
        BMI: 24.5,
        Temp: 36.7,
        Chief_Complaint: 'Nausea',
      });

      await patient6.createVitalSign({
        Blood_Pressure: 128.0,
        Height: 174.0,
        Weight: 74.0,
        Heart_rate: 68.0,
        BMI: 24.6,
        Temp: 36.6,
        Chief_Complaint: 'Insomnia',
      });

      // Add vital signs for patient7
      await patient7.createVitalSign({
        Blood_Pressure: 130.0,
        Height: 175.0,
        Weight: 75.0,
        Heart_rate: 67.0,
        BMI: 24.7,
        Temp: 36.5,
        Chief_Complaint: 'Dizziness',
      });

      await patient7.createVitalSign({
        Blood_Pressure: 132.0,
        Height: 176.0,
        Weight: 76.0,
        Heart_rate: 66.0,
        BMI: 24.8,
        Temp: 36.4,
        Chief_Complaint: 'Shortness of breath',
      });

      await patient7.createVitalSign({
        Blood_Pressure: 134.0,
        Height: 177.0,
        Weight: 77.0,
        Heart_rate: 65.0,
        BMI: 24.9,
        Temp: 36.3,
        Chief_Complaint: 'Chest pain',
      });

      await patient7.createVitalSign({
        Blood_Pressure: 136.0,
        Height: 178.0,
        Weight: 78.0,
        Heart_rate: 64.0,
        BMI: 25.0,
        Temp: 36.2,
        Chief_Complaint: 'Weakness',
      });

      await patient7.createVitalSign({
        Blood_Pressure: 138.0,
        Height: 179.0,
        Weight: 79.0,
        Heart_rate: 63.0,
        BMI: 25.1,
        Temp: 36.1,
        Chief_Complaint: 'Abdominal pain',
      });

      // Add vital signs for patient8
      await patient8.createVitalSign({
        Blood_Pressure: 120.0,
        Height: 170.0,
        Weight: 70.0,
        Heart_rate: 72.0,
        BMI: 24.2,
        Temp: 37,
        Chief_Complaint: 'Headache',
      });

      await patient8.createVitalSign({
        Blood_Pressure: 122.0,
        Height: 172.0,
        Weight: 72.0,
        Heart_rate: 70.0,
        BMI: 24.4,
        Temp: 36.9,
        Chief_Complaint: 'Fatigue',
      });

      await patient8.createVitalSign({
        Blood_Pressure: 124.0,
        Height: 174.0,
        Weight: 74.0,
        Heart_rate: 68.0,
        BMI: 24.6,
        Temp: 36.8,
        Chief_Complaint: 'Nausea',
      });

      // Add vital signs for patient9
      await patient9.createVitalSign({
        Blood_Pressure: 130.0,
        Height: 160.0,
        Weight: 60.0,
        Heart_rate: 80.0,
        BMI: 23.9,
        Temp: 38,
        Chief_Complaint: 'Fever',
      });

      await patient9.createVitalSign({
        Blood_Pressure: 132.0,
        Height: 162.0,
        Weight: 62.0,
        Heart_rate: 78.0,
        BMI: 24.1,
        Temp: 38.1,
        Chief_Complaint: 'Cough',
      });
      // Add vital signs for patient10
      await patient10.createVitalSign({
        Blood_Pressure: 125.0,
        Height: 168.0,
        Weight: 65.0,
        Heart_rate: 75.0,
        BMI: 23.5,
        Temp: 37.2,
        Chief_Complaint: 'Fatigue',
      });

      await patient10.createVitalSign({
        Blood_Pressure: 128.0,
        Height: 170.0,
        Weight: 68.0,
        Heart_rate: 78.0,
        BMI: 23.8,
        Temp: 37.0,
        Chief_Complaint: 'Headache',
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
        Date: '2024-05-06 08:00:00',
        Cycle_Number:1
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
        Date: '2024-05-06 08:00:00',
        Cycle_Number:2
      }
    );

    await patient3.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'High',
      Skin_change: 'Low',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-06-01 09:00:00',
      Cycle_Number: 1
    });
    
    await patient3.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'Moderate',
      Skin_change: 'High',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-07-01 10:00:00',
      Cycle_Number: 2
    });
    
    await patient3.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'High',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'High',
      Skin_change: 'High',
      Blood_cell_loss: 'High',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-08-01 11:00:00',
      Cycle_Number: 3
    });
    
    await patient4.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Moderate',
      Skin_change: 'Low',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-06-02 08:00:00',
      Cycle_Number: 1
    });
    
    await patient4.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'High',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'High',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-07-02 09:00:00',
      Cycle_Number: 2
    });
    
    await patient4.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Low',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Low',
      Skin_change: 'High',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-08-02 10:00:00',
      Cycle_Number: 3
    });
    
    await patient5.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Low',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Low',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-06-03 08:00:00',
      Cycle_Number: 1
    });
    
    await patient5.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Moderate',
      Skin_change: 'Low',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-07-03 09:00:00',
      Cycle_Number: 2
    });
    
    await patient5.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'High',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'High',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-08-03 10:00:00',
      Cycle_Number: 3
    });
        
    await patient6.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'High',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'High',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-06-04 08:00:00',
      Cycle_Number: 1
    });
    
    await patient6.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Low',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Low',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-07-04 09:00:00',
      Cycle_Number: 2
    });
    
    await patient6.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Moderate',
      Skin_change: 'Low',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-08-04 10:00:00',
      Cycle_Number: 3
    });
    await patient7.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'High',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Low',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-06-05 08:00:00',
      Cycle_Number: 1
    });
    
    await patient7.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'Low',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'Moderate',
      Skin_change: 'High',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-07-05 09:00:00',
      Cycle_Number: 2
    });
    
    await patient7.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'High',
      Skin_change: 'Low',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-08-05 10:00:00',
      Cycle_Number: 3
    });
    
    await patient8.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Low',
      Skin_change: 'High',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-06-06 08:00:00',
      Cycle_Number: 1
    });
    
    await patient8.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'High',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Moderate',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'High',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-07-06 09:00:00',
      Cycle_Number: 2
    });
    
    await patient8.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'Low',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'High',
      Skin_change: 'Low',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-08-06 10:00:00',
      Cycle_Number: 3
    });
    
    await patient9.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'High',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'Low',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'High',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-06-07 08:00:00',
      Cycle_Number: 1
    });
    
    await patient9.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'High',
      Skin_change: 'Low',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-07-07 09:00:00',
      Cycle_Number: 2
    });
    
    await patient9.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'Low',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Moderate',
      Skin_change: 'High',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-08-07 10:00:00',
      Cycle_Number: 3
    });
    
    await patient10.createSideEffect({
      Nausea: 'High',
      Loss_of_appetite: 'High',
      Hair_loss: 'Moderate',
      Gastrointestinal_disturbances: 'Low',
      Loss_of_memory: 'High',
      Skin_change: 'Moderate',
      Blood_cell_loss: 'Low',
      Psychological_effects: 'Moderate',
      Changes_in_kidney_and_liver_function: 'High',
      Date: '2024-06-08 08:00:00',
      Cycle_Number: 1
    });
    
    await patient10.createSideEffect({
      Nausea: 'Moderate',
      Loss_of_appetite: 'Low',
      Hair_loss: 'High',
      Gastrointestinal_disturbances: 'Moderate',
      Loss_of_memory: 'Low',
      Skin_change: 'High',
      Blood_cell_loss: 'Moderate',
      Psychological_effects: 'Low',
      Changes_in_kidney_and_liver_function: 'Moderate',
      Date: '2024-07-08 09:00:00',
      Cycle_Number: 2
    });
    
    await patient10.createSideEffect({
      Nausea: 'Low',
      Loss_of_appetite: 'Moderate',
      Hair_loss: 'Low',
      Gastrointestinal_disturbances: 'High',
      Loss_of_memory: 'Moderate',
      Skin_change: 'Low',
      Blood_cell_loss: 'High',
      Psychological_effects: 'High',
      Changes_in_kidney_and_liver_function: 'Low',
      Date: '2024-08-08 10:00:00',
      Cycle_Number: 3
    });
      

    //===========================RADIOGRAPHY=============================================================
    await patient1.createRadiography({
      MRI: 'MRI 1-1',
      CT: 'CT 1-1',
      PET_CT: 'PET-CT 1-1',
      Ultrasound: 'Ultrasound 1-1',
      XRay: 'X-Ray 1-1',
      Mammography: 'Mammography 1-1',
      DEXA: 'DEXA 1-1',
    });

    await patient1.createRadiography({
      MRI: 'MRI Result 1-2',
      CT: 'CT Result 1-2',
      PET_CT: 'PET-CT Result 1-2',
      Ultrasound: 'Ultrasound Result 1-2',
      XRay: 'X-Ray Result 1-2',
      Mammography: 'Mammography Result 1-2',
      DEXA: 'DEXA Result 1-2',
    });
    await patient2.createRadiography({
      MRI: 'MRI 2-1',
      CT: 'CT 2-1',
      PET_CT: 'PET-CT 2-1',
      Ultrasound: 'Ultrasound 2-1',
      XRay: 'X-Ray 2-1',
      Mammography: 'Mammography 2-1',
      DEXA: 'DEXA 2-1',
    });

    await patient2.createRadiography({
      MRI: 'MRI Result 2-2',
      CT: 'CT Result 2-2',
      PET_CT: 'PET-CT Result 2-2',
      Ultrasound: 'Ultrasound Result 2-2',
      XRay: 'X-Ray Result 2-2',
      Mammography: 'Mammography Result 2-2',
      DEXA: 'DEXA Result 2-2',
    });
    await patient3.createRadiography({
      MRI: 'MRI 3-1',
      CT: 'CT 3-1',
      PET_CT: 'PET-CT 3-1',
      Ultrasound: 'Ultrasound 3-1',
      XRay: 'X-Ray 3-1',
      Mammography: 'Mammography 3-1',
      DEXA: 'DEXA 3-1',
    });

    await patient3.createRadiography({
      MRI: 'MRI Result 3-2',
      CT: 'CT Result 3-2',
      PET_CT: 'PET-CT Result 3-2',
      Ultrasound: 'Ultrasound Result 3-2',
      XRay: 'X-Ray Result 3-2',
      Mammography: 'Mammography Result 3-2',
      DEXA: 'DEXA Result 3-2',
    });
    await patient4.createRadiography({
      MRI: 'MRI 4-1',
      CT: 'CT 4-1',
      PET_CT: 'PET-CT 4-1',
      Ultrasound: 'Ultrasound 4-1',
      XRay: 'X-Ray 4-1',
      Mammography: 'Mammography 4-1',
      DEXA: 'DEXA 4-1',
    });

    await patient4.createRadiography({
      MRI: 'MRI Result 4-2',
      CT: 'CT Result 4-2',
      PET_CT: 'PET-CT Result 4-2',
      Ultrasound: 'Ultrasound Result 4-2',
      XRay: 'X-Ray Result 4-2',
      Mammography: 'Mammography Result 4-2',
      DEXA: 'DEXA Result 4-2',
    });
    await patient4.createRadiography({
      MRI: 'MRI 4-3',
      CT: 'CT4-3',
      PET_CT: 'PET-CT 4-3',
      Ultrasound: 'Ultrasound 4-3',
      XRay: 'X-Ray 4-3',
      Mammography: 'Mammography 4-3',
      DEXA: 'DEXA 4-3',
    });

    await patient4.createRadiography({
      MRI: 'MRI Result 4-4',
      CT: 'CT Result 4-4',
      PET_CT: 'PET-CT Result 4-4',
      Ultrasound: 'Ultrasound Result 4-4',
      XRay: 'X-Ray Result 4-4',
      Mammography: 'Mammography Result 4-4',
      DEXA: 'DEXA Result 4-4',
    });
    await patient5.createRadiography({
      MRI: 'MRI5-1',
      CT: 'CT 5-1',
      PET_CT: 'PET-CT 5-1',
      Ultrasound: 'Ultrasound 5-1',
      XRay: 'X-Ray 5-1',
      Mammography: 'Mammography 5-1',
      DEXA: 'DEXA 5-1',
    });

    await patient6.createRadiography({
      MRI: 'MRI Result6-1',
      CT: 'CT Result 6-1',
      PET_CT: 'PET-CT Result 6-1',
      Ultrasound: 'Ultrasound Result 6-1',
      XRay: 'X-Ray Result 6-1',
      Mammography: 'Mammography Result 6-1',
      DEXA: 'DEXA Result 6-1',
    });
    await patient7.createRadiography({
      MRI: 'MRI 7-1',
      CT: 'CT 7-1',
      PET_CT: 'PET-CT 7-1',
      Ultrasound: 'Ultrasound 7-1',
      XRay: 'X-Ray 7-1',
      Mammography: 'Mammography 7-1',
      DEXA: 'DEXA 7-1',
    });

    await patient7.createRadiography({
      MRI: 'MRI Result 7-2',
      CT: 'CT Result 7-2',
      PET_CT: 'PET-CT Result 7-2',
      Ultrasound: 'Ultrasound Result 7-2',
      XRay: 'X-Ray Result 7-2',
      Mammography: 'Mammography Result 7-2',
      DEXA: 'DEXA Result 7-2',
    });
    await patient8.createRadiography({
      MRI: 'MRI1',
      CT: 'CT',
      PET_CT: 'PET-CT1',
      Ultrasound: 'Ultrasound1',
      XRay: 'X-Ray1',
      Mammography: 'Mammography 1',
      DEXA: 'DEXA1',
    });

    await patient9.createRadiography({
      MRI: 'MRI Result 2',
      CT: 'CT Result 2',
      PET_CT: 'PET-CT Result 2',
      Ultrasound: 'Ultrasound Result 2',
      XRay: 'X-Ray Result 2',
      Mammography: 'Mammography Result 2',
      DEXA: 'DEXA Result 2',
    });
    await patient10.createRadiography({
      MRI: 'MRI1',
      CT: 'CT',
      PET_CT: 'PET-CT1',
      Ultrasound: 'Ultrasound1',
      XRay: 'X-Ray1',
      Mammography: 'Mammography 1',
      DEXA: 'DEXA1',
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
    // Create additional medical records for patient3
    await patient3.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'Low',
      Electrophoresis: 'High',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 12,
      createdAt: new Date(),
    });

    await patient3.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'Normal',
      Electrophoresis: 'Normal',
      CEA: 'High',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 15,
      createdAt: new Date(),
    });
    // Create medical records for patient4
    await patient4.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'Normal',
      Electrophoresis: 'High',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 11,
      createdAt: new Date(),
    });

    await patient4.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Low',
      B2M: 'Normal',
      Tumor_size: 9,
      createdAt: new Date(),
    });

    await patient4.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'Normal',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'High',
      B2M: 'Normal',
      Tumor_size: 13,
      createdAt: new Date(),
    });

    // Create medical records for patient5
    await patient5.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 12,
      createdAt: new Date(),
    });

    // Create medical record for patient6
    await patient6.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'High',
      Tumor_size: 8,
      createdAt: new Date(),
    });

    // Create medical record for patient7
    await patient7.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'High',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 10,
      createdAt: new Date(),
    });

    // Create medical record for patient8
    await patient8.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'Normal',
      Electrophoresis: 'High',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 11,
      createdAt: new Date(),
    });

    // Create medical record for patient9
    await patient9.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'High',
      B2M: 'Normal',
      Tumor_size: 9,
      createdAt: new Date(),
    });
    // Create medical records for patient10
    await patient10.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'High',
      B2M: 'Normal',
      Tumor_size: 15,
      createdAt: new Date(),
    });

    await patient10.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 13,
      createdAt: new Date(),
    });

    await patient10.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'Normal',
      Electrophoresis: 'High',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 14,
      createdAt: new Date(),
    });

    await patient10.createMedical({
      Urinanalysis: 'Abnormal',
      CBC: 'High',
      Electrophoresis: 'High',
      CEA: 'Normal',
      AFP: 'Normal',
      B2M: 'Normal',
      Tumor_size: 12,
      createdAt: new Date(),
    });

    await patient10.createMedical({
      Urinanalysis: 'Normal',
      CBC: 'High',
      Electrophoresis: 'Normal',
      CEA: 'Normal',
      AFP: 'High',
      B2M: 'Normal',
      Tumor_size: 11,
      createdAt: new Date(),
    });

    //===========================CANCER OVERVIEW=============================================================

    const cancerOverview1 = await patient1.createCancerOverview({
      Stage: 'Stage1',
      Cancer_type: 'Lymphoma Cancer',
      Note_On_cancer: 'Note for cancer data 1',
    });
    const cancerOverview2 = await patient2.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Central Nervous System Cancer',
      Note_On_cancer: 'Note for cancer data 2',
    });
    const cancerOverview3 = await patient3.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Breast Cancer',
      Note_On_cancer: 'Note for cancer data 3',
    });
    const cancerOverview4 = await patient4.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Central Nervous System Cancer',
      Note_On_cancer: 'Note for cancer data 4',
    });
    const cancerOverview5 = await patient5.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Breast Cancer',
      Note_On_cancer: 'Note for cancer data 5',
    });
    const cancerOverview6 = await patient6.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Central Nervous System Cancer',
      Note_On_cancer: 'Note for cancer data 6',
    });
    const cancerOverview7 = await patient7.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Lymphoma Cancer',
      Note_On_cancer: 'Note for cancer data 7',
    });
    const cancerOverview8 = await patient8.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Breast Cancer',
      Note_On_cancer: 'Note for cancer data 8',
    });
    const cancerOverview9 = await patient9.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Pancreatic Cancer',
      Note_On_cancer: 'Note for cancer data 9',
    });
    const cancerOverview10 = await patient10.createCancerOverview({
      Stage: 'Stage2',
      Cancer_type: 'Pancreatic Cancer',
      Note_On_cancer: 'Note for cancer data 10',
    });
   
    //===========================CYCLES=============================================================
    // const cycle1 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2024-05-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    //   Is_active:true
    //   // cycle_note:'all is good'
    // });
    
    // const cycle2 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2024-06-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    //   Is_active:false,
    //   // cycle_note:'👍👍👍👍👍',
      
    // });
    
    // const cycle3 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2024-07-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    //   Is_active:true,
    //   // cycle_note:'💔💔💔💔'
    // });
    
    // const cycle4 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2024-10-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    //   // cycle_note:'still alive'
    // });

    // const cycle5 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2025-01-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle6 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2025-04-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle7 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2025-07-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle8 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2025-10-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    // const cycle9 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2026-01-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle10 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2026-04-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle11 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2026-07-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle12 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2026-10-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle13 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2027-01-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle14 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2027-04-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle15 = await Cycles.create({
    //   Cycle_Number: 2,
    //   Start_Date: '2027-07-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    
    // const cycle16 = await Cycles.create({
    //   Cycle_Number: 1,
    //   Start_Date: '2027-10-01',
    //   Start_Time: '08:00:00',
    //   End_Time: '17:00:00',
    // });
    //===========================PRE MEDICATIONS=============================================================
    // const premed1 = await Premedications.create({
    //   Medication_Name: 'Premed A',
    //   Dose: 10,
    //   Route: 'Oral',
    //   Instructions: 'Take before chemotherapy',
    // });
    // const premed2 = await Premedications.create({
    //   Medication_Name: 'Premed B',
    //   Dose: 20,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer slowly',
    // });
    // const premed3 = await Premedications.create({
    //   Medication_Name: 'Premed C',
    //   Dose: 35,
    //   Route: 'Oral',
    //   Instructions: 'Take before chemotherapy',
    // });
    // const premed4 = await Premedications.create({
    //   Medication_Name: 'Premed D',
    //   Dose: 40,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer slowly',
    // });
    // const premed5 = await Premedications.create({
    //   Medication_Name: 'Premed E',
    //   Dose: 25,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer before procedure',
    // });
    
    // const premed6 = await Premedications.create({
    //   Medication_Name: 'Premed F',
    //   Dose: 15,
    //   Route: 'Oral',
    //   Instructions: 'Take 1 hour before chemotherapy',
    // });
    
    // const premed7 = await Premedications.create({
    //   Medication_Name: 'Premed G',
    //   Dose: 30,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer slowly over 30 minutes',
    // });
    
    // const premed8 = await Premedications.create({
    //   Medication_Name: 'Premed H',
    //   Dose: 50,
    //   Route: 'Oral',
    //   Instructions: 'Take with food',
    // });
    // const premed9 = await Premedications.create({
    //   Medication_Name: 'Premed I',
    //   Dose: 45,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer before chemotherapy infusion',
    // });
    
    // const premed10 = await Premedications.create({
    //   Medication_Name: 'Premed J',
    //   Dose: 18,
    //   Route: 'Oral',
    //   Instructions: 'Take 30 minutes before treatment',
    // });
    
    // const premed11 = await Premedications.create({
    //   Medication_Name: 'Premed K',
    //   Dose: 22,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer with a saline flush',
    // });
    
    // const premed12 = await Premedications.create({
    //   Medication_Name: 'Premed L',
    //   Dose: 28,
    //   Route: 'Oral',
    //   Instructions: 'Take as directed by healthcare provider',
    // });
        
    //===========================CHEMOTHERAPY MEDICATIONS=============================================================
    // const chemotherapy1 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug A',
    //   Dose: 100,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer over 2 hours',
    //   Dosage_Reduction: 0,
    
      
    // });
    // const chemotherapy2 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug B',
    //   Dose: 58,
    //   Route: 'Oral',
    //   Instructions: 'Take with food',
    //   Dosage_Reduction: 25,
    // });
    // const chemotherapy3 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug C',
    //   Dose: 580,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer over 2 hours',
    //   Dosage_Reduction: 0,
    // });
    // const chemotherapy4 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug D',
    //   Dose: 250,
    //   Route: 'Oral',
    //   Instructions: 'Take with food',
    //   Dosage_Reduction: 25,
    // });
    // const chemotherapy5 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug E',
    //   Dose: 75,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer over 1 hour',
    //   Dosage_Reduction: 10,
    //   Administered_Dose_ml: 50,
    //   Administered_Dose_mg: 25,
    // });
    
    // const chemotherapy6 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug F',
    //   Dose: 150,
    //   Route: 'Oral',
    //   Instructions: 'Take on an empty stomach',
    //   Dosage_Reduction: 0,
    //   Administered_Dose_ml: 120,
    //   Administered_Dose_mg: 40,
    // });
    
    // const chemotherapy7 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug G',
    //   Dose: 300,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer slowly over 2 hours',
    //   Dosage_Reduction: 15,
    //   Administered_Dose_ml: 80,
    //   Administered_Dose_mg: 15,
    // });
    
    // const chemotherapy8 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug H',
    //   Dose: 200,
    //   Route: 'Oral',
    //   Instructions: 'Take with water',
    //   Dosage_Reduction: 20,
    //   Administered_Dose_ml: 100,
    //   Administered_Dose_mg: 30,
    // });
    // const chemotherapy9 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug I',
    //   Dose: 120,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer over 3 hours',
    //   Dosage_Reduction: 5,
    //   Administered_Dose_ml: 70,
    //   Administered_Dose_mg: 25,
    // });
    
    // const chemotherapy10 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug J',
    //   Dose: 180,
    //   Route: 'Oral',
    //   Instructions: 'Take with a full glass of water',
    //   Dosage_Reduction: 10,
    //   Administered_Dose_ml: 150,
    //   Administered_Dose_mg: 50,
    // });
    
    // const chemotherapy11 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug K',
    //   Dose: 250,
    //   Route: 'Intravenous',
    //   Instructions: 'Administer over 4 hours',
    //   Dosage_Reduction: 5,
    //   Administered_Dose_ml: 100,
    //   Administered_Dose_mg: 30,
    // });
    
    // const chemotherapy12 = await ChemotherapyMedications.create({
    //   Medication_Name: 'Drug L',
    //   Dose: 80,
    //   Route: 'Oral',
    //   Instructions: 'Take with or without food',
    //   Dosage_Reduction: 0,
    //   Administered_Dose_ml: 110,
    //   Administered_Dose_mg: 40,
    // });
        
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
    const doctor3 = await Doctor.create({
      speciality: 'Dermatologist',
      license_number: '101010',
      id_profile: 3,
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
    await doctor3.createUser({
      Username: 'MoAbdelzaher',
      Password: 'admin',
      Email: '100100@gmail.com',
      is_admin: true,
    });
 
    // Associate patient with Treatmentplans

    // Associate Treatment plans with cycles (many-to-many)
    // await Treatmentplan1.addCycles([cycle1, cycle2]);
    // await Treatmentplan2.addCycles([cycle3, cycle4]);
    // await Treatmentplan3.addCycles([cycle1, cycle2, cycle3]);
    // await Treatmentplan4.addCycles([cycle3, cycle4, cycle5,cycle2]);
    // await Treatmentplan5.addCycles([cycle11, cycle12,cycle6,cycle7,cycle8]);
    // await Treatmentplan6.addCycles([cycle10, cycle8, cycle5,cycle1]);
    // await Treatmentplan7.addCycles([cycle1, cycle15,cycle16]);
    // await Treatmentplan8.addCycles([cycle13, cycle14]);
    // await Treatmentplan9.addCycles([cycle16, cycle15,cycle10, cycle9]);
    // await Treatmentplan10.addCycles([cycle9, cycle4,cycle3,cycle11]);

    // Association cycles with premedication
    // await cycle1.addPremedication([premed1, premed2]);
    // await cycle2.addPremedication([premed3, premed1]);
    // await cycle3.addPremedication([premed4, premed1]);
    // await cycle4.addPremedication([premed4, premed3]);
    // await cycle5.addPremedication([premed5, premed6]);
    // await cycle6.addPremedication([premed7, premed8, premed9]);
    // await cycle7.addPremedication([premed5, premed10, premed11]);
    // await cycle8.addPremedication([premed12]);
    // await cycle9.addPremedication([premed6, premed7, premed8]);
    // await cycle10.addPremedication([premed9, premed10]);
    // await cycle11.addPremedication([premed11, premed12]);
    // await cycle12.addPremedication([premed5, premed6, premed7]);
    // await cycle13.addPremedication([premed8, premed9, premed10]);
    // await cycle14.addPremedication([premed11, premed12]);
    // await cycle15.addPremedication([premed5, premed6, premed7]);
    // await cycle16.addPremedication([premed8, premed9, premed10]);
    

    // Associate Cycles with ChemotherapyMedications
    // await cycle1.addChemotherapyMedication([chemotherapy1, chemotherapy3]);
    // await cycle2.addChemotherapyMedication([chemotherapy1, chemotherapy2]);
    // await cycle3.addChemotherapyMedication([chemotherapy4, chemotherapy1]);
    // await cycle4.addChemotherapyMedication([chemotherapy4, chemotherapy2]);
    // await cycle5.addChemotherapyMedication([chemotherapy5, chemotherapy6]);
    // await cycle6.addChemotherapyMedication([chemotherapy6, chemotherapy7, chemotherapy8]);
    // await cycle7.addChemotherapyMedication([chemotherapy7, chemotherapy8]);
    // await cycle8.addChemotherapyMedication([chemotherapy8, chemotherapy9]);
    // await cycle9.addChemotherapyMedication([chemotherapy9, chemotherapy10]);
    // await cycle10.addChemotherapyMedication([chemotherapy10, chemotherapy11]);
    // await cycle11.addChemotherapyMedication([chemotherapy11, chemotherapy12]);
    // await cycle12.addChemotherapyMedication([chemotherapy12]);
    // await cycle13.addChemotherapyMedication([chemotherapy5, chemotherapy6]);
    // await cycle14.addChemotherapyMedication([chemotherapy6, chemotherapy7]);
    // await cycle15.addChemotherapyMedication([chemotherapy7, chemotherapy8, chemotherapy9]);
    // await cycle16.addChemotherapyMedication([chemotherapy8, chemotherapy9]);


    

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
      Plan_Name: 'CHOP',
      number_of_Weeks: 3,
      number_of_Cycles: 6,
      Cancer_Type: 'Lymphoma Cancer',
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
      Plan_Name: 'ABVD',
      number_of_Weeks: 4,
      number_of_Cycles: 7,
      Cancer_Type: 'Lymphoma Cancer',
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
      Plan_Name: 'COP',
      number_of_Weeks: 3,
      number_of_Cycles: 6,
      Cancer_Type: 'Lymphoma Cancer',
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
      Plan_Name: 'FOLFIRINOX',
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
      Plan_Name: 'Gemcitabine',
      number_of_Weeks: 18,
      number_of_Cycles: 6,
      Cancer_Type: 'Pancreatic Cancer',
    });

    // Step 2: Insert premedication data
    const premedicationsInserted5 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'Oral or Intravenous',
        Instructions:
          'Administered before chemotherapy to prevent nausea and vomiting.',
      },
    ]);

    // Step 3: Insert chemotherapy data
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

    // Step 4: Associate treatment plan premedications, and chemotherapy
    await treatmentPlanreadonly5.setPremedicationReads(premedicationsInserted5);
    await treatmentPlanreadonly5.setChemotherapyMedReads(chemotherapyInserted5);

    // 6-========== CNBEV: Protocol for Recurrent Malignant Gliomas Using Bevacizumab=================
    // Step 1: Create treatment plan
    const treatmentPlan6 = await treatmentPlanReadOnly.create({
      Plan_Name: 'CNBEV',
      number_of_Weeks: 18,
      number_of_Cycles: 6,
      Cancer_Type: 'Central Nervous System Cancer',
    });

    // Step 2: Insert premedication data
    const premedications6 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Prochlorperazine',
        Dose: 8,
        Route: 'Oral',
        Instructions: 'Given 30 minutes prior to first dose of concomitant temozolomide with RT, plus dexamethasone 12 mg PO 30 min before lomustine',
      },
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'Oral or Intravenous',
        Instructions: 'Given 30 minutes prior to first dose of concomitant temozolomide with RT, prior to each dose of temozolomide',
      },
    ]);

    // Step 3: Insert chemotherapy data
    const chemotherapy6 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'Bevacizumab',
        Dose: 150,
        Route: 'Oral or Intravenous',
        Instructions: 'IV in 100 mL NS over 30 minutes to 1 hour',
      },
      {
        Medication_Name: 'Lomustine',
        Dose: 90,
        Route: 'Oral or Intravenous',
        Instructions: 'On day 1 every 6 weeks',
      },
    ]);

    // Step 4: Associate treatment plan with premedications and chemotherapy
    await treatmentPlan6.setPremedicationReads(premedications6);
    await treatmentPlan6.setChemotherapyMedReads(chemotherapy6);

    // 7-========== CNCCV: Protocol for Adjuvant Lomustine, CISplatin and vinCRIStine in Adult High-Risk Medulloblastoma=================
    // Step 1: Create treatment plan
    const treatmentPlan7 = await treatmentPlanReadOnly.create({
      Plan_Name: 'CNCCV',
      number_of_Weeks: 12,
      number_of_Cycles: 4,
      Cancer_Type: 'Central Nervous System Cancer',
    });

    // Step 2: Insert premedication data
    const premedications7 = await PremedicationRead.bulkCreate([
      {
        Medication_Name: 'Ondansetron',
        Dose: 8,
        Route: 'Oral or Intravenous',
        Instructions: 'q12h for 36 hours (starting 30 min before lomustine)',
      },
      {
        Medication_Name: 'prochlorperazine',
        Dose: 10,
        Route: 'Oral or Intravenous',
        Instructions: 'q12h for 36 hours (starting 30 min before lomustine)',
      },
    ]);

    // Step 3: Insert chemotherapy data
    const chemotherapy7 = await ChemotherapyMedRead.bulkCreate([
      {
        Medication_Name: 'temozolomide ',
        Dose:75,
        Route: 'Oral or Intravenous',
        Instructions: 'IV in 50 mL NS over 15 mins',
      },
      {
        Medication_Name: 'Lomustine',
        Dose: 110,
        Route: 'Oral',
        Instructions: 'At bedtime',
      },
      {
        Medication_Name: 'Procarbazine',
        Dose: 60,
        Route: 'Oral or Intravenous',
        Instructions: 'Days 2 to 15',
      },
      {
        Medication_Name: 'VinCRIStine',
        Dose: 140,
        Route: 'Oral or Intravenous',
        Instructions: 'IV in 50 mL NS over 15 mins (Day 22 counts not required to proceed with vinCRIStine)',
      },
    ]);

    // Step 4: Associate treatment plan with premedications and chemotherapy
    await treatmentPlan7.setPremedicationReads(premedications7);
    await treatmentPlan7.setChemotherapyMedReads(chemotherapy7);

    // 8-========== CNMODPCVT: Protocol for Modified PCV Chemotherapy Of Brain Tumours=================
    // Step 1: Create treatment plan
    const treatmentPlan8 = await treatmentPlanReadOnly.create({
    Plan_Name: 'CNMODPCVT',
    number_of_Weeks: 15,
    number_of_Cycles: 4, // Updated to integers
    Cancer_Type: 'Central Nervous System Cancer',
    });

  // Step 2: Insert premedication data
    const premedications8 = await PremedicationRead.bulkCreate([
    {
    Medication_Name: 'Ondansetron',
    Dose: 8,
    Route: 'Oral or Intravenous',
    Instructions: 'q12h for 36 hours (starting 30 min before lomustine)',
    },
    {
    Medication_Name: 'Dexamethasone',
    Dose: 8,
    Route: 'Oral or Intravenous',
    Instructions: 'q12h for 36 hours (starting 30 min before lomustine)',
    },
    ]);

    // Step 3: Insert chemotherapy data
    const chemotherapy8 = await ChemotherapyMedRead.bulkCreate([
    {
    Medication_Name: 'Vincristine',
    Dose: 140,
    Route: 'Oral or Intravenous',
    Instructions: 'IV in 50 mL NS over 15 mins',
    },
    {
    Medication_Name: 'Lomustine',
    Dose: 110,
    Route: 'Oral',
    Instructions: 'At bedtime',
    },
    {
    Medication_Name: 'Procarbazine',
    Dose: 60,
    Route: 'Oral or Intravenous',
    Instructions: 'Days 2 to 15',
    },
    {
    Medication_Name: 'VinCRIStine',
    Dose: 140,
    Route: 'Oral or Intravenous',
    Instructions: 'IV in 50 mL NS over 15 mins (Day 22 counts not required to proceed with vinCRIStine)',
    },
    ]);

// Step 4: Associate treatment plan with premedications and chemotherapy
  await treatmentPlan8.setPremedicationReads(premedications8);
  await treatmentPlan8.setChemotherapyMedReads(chemotherapy8);

// 9-========== UBRAJABEAI: Treatment of Adjuvant Breast Cancer using Abemaciclib=================
// Step 1: Create treatment plan
const treatmentPlan9 = await treatmentPlanReadOnly.create({
  Plan_Name: 'UBRAJABEAI',
  number_of_Weeks: 104, // 2 years = 104 weeks
  number_of_Cycles: 26,
  Cancer_Type: 'Breast Cancer',
});

// Step 2: Insert premedication data (Antiemetic protocol for low emetogenic chemotherapy protocols)

// Step 3: Insert chemotherapy data
const chemotherapy9 = await ChemotherapyMedRead.bulkCreate([
  {
    Medication_Name: 'Abemaciclib',
    Dose: 150,
    Route: 'Oral',
    Instructions: 'Daily',
  },
  {
    Medication_Name: 'Letrozole',
    Dose: 2.5,
    Route: 'Oral or Intravenous',
    Instructions: 'Daily',
  },
  {
    Medication_Name: 'Goserelin',
    Dose: 3.6,
    Route: 'Oral or Intravenous',
    Instructions: 'Every 4 weeks',
  },
]);

  // Step 4: Associate treatment plan with chemotherapy
  await treatmentPlan9.setChemotherapyMedReads(chemotherapy9);

  // 10-========== BRAJACTT: Protocol for Neoadjuvant or Adjuvant Therapy for Breast Cancer using DOXOrubicin=================
  // Step 1: Create treatment plan
  const treatmentPlan10 = await treatmentPlanReadOnly.create({
    Plan_Name: 'BRAJACTT',
    number_of_Weeks: 74,
    number_of_Cycles: 17,
    Cancer_Type: 'Breast Cancer',
  });

  // Step 2: Insert premedication data
  const premedications10 = await PremedicationRead.bulkCreate([
    {
      Medication_Name: 'Dexamethasone',
      Dose: 20,
      Route: 'Oral or Intravenous',
      Instruction: '45 minutes prior to PACLitaxel',
    },
    {
      Medication_Name: 'Diphenhydramine',
      Dose: 50,
      Route: 'Oral or Intravenous',
      Instruction: '30 minutes prior to PACLitaxel',
    },
    {
      Medication_Name: 'Famotidine',
      Dose: 20,
      Route: 'Oral or Intravenous',
      Instruction: 'Over 15 minutes prior to PACLitaxel',
    },
  ]);

  // Step 3: Insert chemotherapy data
  const chemotherapy10 = await ChemotherapyMedRead.bulkCreate([
    {
      Medication_Name: 'DOXOrubicin',
      Dose: 60,
      Route: 'Oral or Intravenous',
      Instructions: 'IV push',
    },
    {
      Medication_Name: 'Cyclophosphamide',
      Dose: 600,
      Route: 'Oral or Intravenous',
      Instructions: 'IV in 100 to 250 mL NS over 20 min to 1 hour',
    },
    {
      Medication_Name: 'Trastuzumab',
      Dose: 6,
      Route: 'Oral or Intravenous',
      Instructions: 'IV in 250 mL NS over 1 hour on the second dose, observe for 30 minutes post infusion',
    },
    {
      Medication_Name: 'PACLitaxel',
      Dose: 175,
      Route: 'Oral or Intravenous',
      Instructions: 'IV in 250 to 500 mL NS over 3 hours',
    },
  ]);

  // Step 4: Associate treatment plan with premedications and chemotherapy
  await treatmentPlan10.setPremedicationReads(premedications10);
  await treatmentPlan10.setChemotherapyMedReads(chemotherapy10);

    console.log('Regimns inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

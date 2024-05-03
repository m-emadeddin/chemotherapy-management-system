// import sequelize & schemas
const Sequelize = require("sequelize");
const db = require("../configs/db.config");
const TPReadOnlyModel = require("./TreatmentPlanReadOnly.models");
const CyclesModel = require("./Cycles.models");
const CancerModel = require("./CancerOverview.models");
const ChemotherapyModel = require("./ChemotherapyMedications.models");
const PatientsModel = require("./Patients.models");
const PremedicationsModel = require("./Premedications.models");
const TreatmentModel = require("./TreatmentPlans.models");
const ReservedBedsModel = require("./ReservedBeds.models");
const VitalSignModel = require("./VitalSign.models");
const RadiographyModel = require("./Radiography.models");
const MedicalAnaylsisModel = require("./MedicalAnalysis.models");
//========================= M to N ======================= 
const PatientsReservedbedsModel = require("./PatientsReservedbeds.models");
const TreatmentPlansCyclesModel = require("./TreatmentPlansCycles.models");
const TreatmentPlanReadOnlyCyclesModel = require("./TreatmentPlanReadOnlyCycles.models");
const PremedicationsCyclesModel = require("./PremedicationsCycles.models");
const ChemotherapyMedicationsCyclesModel =require("./ChemotherapyMedicationsCycles.models");
const TreatmentPlanReadOnlyPremedicationsModel = require("./TreatmentPlanReadOnlyPremedications.models");
const TreatmentPlansPremedicationModel = require("./TreatmentPlansPremedications.models");

// create models
const treatmentPlanReadOnly = TPReadOnlyModel(db, Sequelize);
const Cycles = CyclesModel(db, Sequelize);
const CancerOverview = CancerModel(db, Sequelize);
const ChemotherapyMedications = ChemotherapyModel(db, Sequelize);
const Patients = PatientsModel(db, Sequelize);
const ReservedBeds = ReservedBedsModel(db, Sequelize);
const VitalSign = VitalSignModel(db, Sequelize);
const Premedications = PremedicationsModel(db, Sequelize);
const TreatmentPlans = TreatmentModel(db, Sequelize);
const Radiography = RadiographyModel(db, Sequelize);
const MedicalAnalysis = MedicalAnaylsisModel(db, Sequelize);

//==========junction tables for M to N realtions==========
const PatientsReservedbeds = PatientsReservedbedsModel(db,Sequelize);
const TreatmentPlansCycles = TreatmentPlansCyclesModel(db,Sequelize)
const TreatmentPlanReadOnlyCycles = TreatmentPlanReadOnlyCyclesModel(db,Sequelize);
const PremedicationsCycles =PremedicationsCyclesModel(db,Sequelize);
const ChemotherapyMedicationsCycles = ChemotherapyMedicationsCyclesModel (db,Sequelize)
const TreatmentPlanReadOnlyPremedications = TreatmentPlanReadOnlyPremedicationsModel(db,Sequelize)
const TreatmentPlansPremedication = TreatmentPlansPremedicationModel(db,Sequelize)


// ====================M to N Relations===================
//1. patients && reserved beds
Patients.belongsToMany(ReservedBeds, { through: PatientsReservedbeds });
ReservedBeds.belongsToMany(Patients, { through: PatientsReservedbeds });

//2. Treatment plans & cycles
Cycles.belongsToMany(TreatmentPlans, { through: TreatmentPlansCycles });
TreatmentPlans.belongsToMany(Cycles, { through: TreatmentPlansCycles });

//3.Treatment plans read only & cycles
Cycles.belongsToMany(treatmentPlanReadOnly, { 
  through: TreatmentPlanReadOnlyCycles ,
  uniqueKey: 'ReadOnlyCycles_unique' // Custom unique constraint name
});
treatmentPlanReadOnly.belongsToMany(Cycles, {
   through: TreatmentPlanReadOnlyCycles ,
   uniqueKey: 'ReadOnlyCycles_unique' // Custom unique constraint name
  });

//4. cycles & premedications
Cycles.belongsToMany(Premedications, { through: PremedicationsCycles });
Premedications.belongsToMany(Cycles, { through: PremedicationsCycles });

//5. cycles & chemotherapy medications
Cycles.belongsToMany(ChemotherapyMedications, { 
  through: ChemotherapyMedicationsCycles,
  uniqueKey: 'ChemotherapyCycles_unique' // Custom unique constraint name
});
ChemotherapyMedications.belongsToMany(Cycles, { 
  through: ChemotherapyMedicationsCycles,
   uniqueKey: 'ChemotherapyCycles_unique' // Custom unique constraint name
});

//6. premedications & Treatment plans read only
// Assuming you have the necessary models imported
Premedications.belongsToMany(treatmentPlanReadOnly, {
  through: TreatmentPlanReadOnlyPremedications,
  uniqueKey: 'ReadOnlyPremedications_unique' // Custom unique constraint name
});
treatmentPlanReadOnly.belongsToMany(Premedications, {
  through: TreatmentPlanReadOnlyPremedications,
  uniqueKey: 'ReadOnlyPremedications_unique' // Custom unique constraint name
});

// //7. premedications & Treatment plans
Premedications.belongsToMany(TreatmentPlans, { 
  through: TreatmentPlansPremedication,
  uniqueKey: 'treatmentPlan_Premed_unique' 
});
TreatmentPlans.belongsToMany(Premedications, { 
  through: TreatmentPlansPremedication,
  uniqueKey: 'treatmentPlan_Premed_unique' 
});


//====================One to Many=======================
//1. Cancer overview & treatment plans Read Only
CancerOverview.hasMany(treatmentPlanReadOnly, {
  foreignKey: {
    name: 'CancerOverview_Stage', // Composite foreign key
  },
  onDelete: 'CASCADE', // optional: specifies what should happen when the associated treatment plans are deleted
});
treatmentPlanReadOnly.belongsTo(CancerOverview, {
  foreignKey: {
    name: 'CancerOverview_Cancer_type', // Composite foreign key
  },
  constraints: true, // enable automatic constraint generation
  targetKey: 'Cancer_type', // Component of the composite primary key in the parent table
});
//2. patients &Radiography
Patients.hasMany(Radiography, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Radiography.belongsTo(Patients, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
//3. patients& medical analysis
Patients.hasMany(MedicalAnalysis, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MedicalAnalysis.belongsTo(Patients, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
//====================One to One=======================
//1. Vital signs & patients
Patients.hasOne(VitalSign, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
VitalSign.belongsTo(Patients);
//2. patients & cancer overview
Patients.hasOne(CancerOverview, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CancerOverview.belongsTo(Patients);
//3. patients & treatment plans
Patients.hasOne(TreatmentPlans, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
TreatmentPlans.belongsTo(Patients);


// Insert data into tables
// Define function to insert data
function insertData() {
  let cancerOverviewInstance;
  let treatmentPlanInstance;

  return CancerOverview.create({ 
    Stage: 'Stage40',
    Cancer_type: 'Type13',
    Note_On_cancer: 'Dummy for Type1 Stage1' 
  })
  .then((cancerOverview) => {
    cancerOverviewInstance = cancerOverview;
    return treatmentPlanReadOnly.create({ 
      Plan_Name: 'Plan8',
      number_of_Weeks: 5,
      number_of_Cycles: 6
    });
  })
  .then((treatmentPlan) => {
    treatmentPlanInstance = treatmentPlan;
    console.log(treatmentPlan.toJSON());
    
    // Associate treatmentPlanReadOnly with CancerOverview
    return treatmentPlanInstance.update({
      CancerOverview_Stage: cancerOverviewInstance.Stage,
      CancerOverview_Cancer_type: cancerOverviewInstance.Cancer_type
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
  });
}


module.exports = {
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
  MedicalAnalysis,
  insertData
};

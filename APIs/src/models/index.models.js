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

// models for many -> many
const PatientReservedBeds = db.define("patient_reservedBeds");
const CycleTreatmentPlans = db.define("cycle_treatmentPlans");
const defaultCycles = db.define("cycle_treatmentPlanReadOnly");
const CyclePremedications = db.define("cycle_premedications");
const CycleChemotherapy = db.define("cycle_chemotherapy");
const defaultPremedications = db.define("premedications_treatmentPlanReadOnly");
const PlansPremedications = db.define("premedications_treatmentPlans");

// ====================M to M Relations===================
//1. patients && reserved beds
Patients.belongsToMany(ReservedBeds, { through: PatientReservedBeds });
ReservedBeds.belongsToMany(Patients, { through: PatientReservedBeds });

//2. Treatment plans & cycles
Cycles.belongsToMany(TreatmentPlans, { through: CycleTreatmentPlans });
TreatmentPlans.belongsToMany(Cycles, { through: CycleTreatmentPlans });

//3.Treatment plans read only & cycles
Cycles.belongsToMany(treatmentPlanReadOnly, { through: defaultCycles });
treatmentPlanReadOnly.belongsToMany(Cycles, { through: defaultCycles });

//4. cycles & premedications
Cycles.belongsToMany(Premedications, { through: CyclePremedications });
Premedications.belongsToMany(Cycles, { through: CyclePremedications });
//5. cycles & chemotherapy medications
Cycles.belongsToMany(ChemotherapyMedications, { through: CycleChemotherapy });
ChemotherapyMedications.belongsToMany(Cycles, { through: CycleChemotherapy });

//6. premedications & Treatment plans read only
Premedications.belongsToMany(treatmentPlanReadOnly, {
  through: defaultPremedications,
});
treatmentPlanReadOnly.belongsToMany(Premedications, {
  through: defaultPremedications,
});
//7. premedications & Treatment plans
Premedications.belongsToMany(TreatmentPlans, { through: PlansPremedications });
TreatmentPlans.belongsToMany(Premedications, { through: PlansPremedications });

//====================One to Many=======================
//1. Cancer overview & treatment plans Read Only
// CancerOverview.hasMany(treatmentPlanReadOnly);
// treatmentPlanReadOnly.belongsTo(CancerOverview);
//2. patients &Radiography
Patients.hasMany(Radiography);
Radiography.belongsTo(Patients);
//3. patients& medical analysis
Patients.hasMany(MedicalAnalysis);
MedicalAnalysis.belongsTo(Patients);
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

// generate tables in DB

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
};

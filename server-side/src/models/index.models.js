// import sequelize & schemas
const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const TPReadOnlyModel = require('./TreatmentPlanReadOnly.models');
const CyclesModel = require('./Cycles.models');
const CancerModel = require('./CancerOverview.models');
const ChemotherapyModel = require('./ChemotherapyMedications.models');
const PatientsModel = require('./Patients.models');
const PremedicationsModel = require('./Premedications.models');
const TreatmentModel = require('./TreatmentPlans.models');
const ReservedBedsModel = require('./ReservedBeds.models');
const VitalSignModel = require('./VitalSign.models');
const RadiographyModel = require('./Radiography.models');
const MedicalModel = require('./Medical.models');
const UserModel = require('./User.models');
const DoctorModel = require('./Doctor.models');
const VisitsModel = require('./Visits.models');

//readonly section
const ChemotherapyMedReadonlyModel = require("./ChemotherapyMedRead.models");
const CycleReadonlyModel = require("./CyclesRead.models")
const PremedicationReadonlyModel = require("./PremedicationsRead.models")
//========================= M to N =======================
const PatientsReservedbedsModel = require('./PatientsReservedbeds.models');
const TreatmentPlansCyclesModel = require('./TreatmentPlansCycles.models');
const PremedicationsCyclesModel = require('./PremedicationsCycles.models');
const ChemotherapyMedicationsCyclesModel = require('./ChemotherapyMedicationsCycles.models');

//readonly section
const ChemotherapyCyclesReadonlyModel =require("./ChemotherapyCyclesReadonly.models")
const TreatmentPlanReadOnlyCyclesModel = require('./TreatmentPlanCyclesReadonly.models');
const PremedicationsCyclesReadonlyModel = require('./PremedicationsCyclesReadonly.models')
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
const User = UserModel(db, Sequelize);
const Doctor = DoctorModel(db, Sequelize);
const Visits = VisitsModel(db, Sequelize);
const Medical = MedicalModel(db, Sequelize);

//readonly section
const ChemotherapyMedRead = ChemotherapyMedReadonlyModel(db,Sequelize);
const CycleRead = CycleReadonlyModel(db,Sequelize);
const PremedicationRead = PremedicationReadonlyModel(db ,Sequelize)

//==========junction tables for M to N realtions==========
const PatientsReservedbeds = PatientsReservedbedsModel(db, Sequelize);
const TreatmentPlansCycles = TreatmentPlansCyclesModel(db, Sequelize);
const PremedicationsCycles = PremedicationsCyclesModel(db, Sequelize);
const ChemotherapyMedicationsCycles = ChemotherapyMedicationsCyclesModel(db, Sequelize);

//readonly section
const TreatmentPlanReadOnlyCycles = TreatmentPlanReadOnlyCyclesModel( db, Sequelize);
const ChemotherapyCyclesReadonly = ChemotherapyCyclesReadonlyModel(db , Sequelize);
const PremedicationsCyclesReadonly = PremedicationsCyclesReadonlyModel(db , Sequelize)
// ====================M to N Relations===================
//1. patients && reserved beds
Patients.belongsToMany(ReservedBeds, {
  through: PatientsReservedbeds,
  foreignKey: { name: 'patientID', allowNull: false },
});
ReservedBeds.belongsToMany(Patients, {
  through: PatientsReservedbeds,
  foreignKey: { name: 'bedID', allowNull: false },
});

//2. Treatment plans & cycles
Cycles.belongsToMany(TreatmentPlans, {
  through: TreatmentPlansCycles,
  foreignKey: { name: 'cycleID', allowNull: false },
});
TreatmentPlans.belongsToMany(Cycles, {
  through: TreatmentPlansCycles,
  foreignKey: { name: 'planID', allowNull: false },
});


//3. cycles & premedications
Cycles.belongsToMany(Premedications, {
  through: PremedicationsCycles,
  foreignKey: { name: 'cycleID', allowNull: false },
});
Premedications.belongsToMany(Cycles, {
  through: PremedicationsCycles,
  foreignKey: { name: 'medicationID', allowNull: false },
});

//4. cycles & chemotherapy medications
Cycles.belongsToMany(ChemotherapyMedications, {
  through: ChemotherapyMedicationsCycles,
  uniqueKey: 'ChemotherapyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'cycleID', allowNull: false },
});
ChemotherapyMedications.belongsToMany(Cycles, {
  through: ChemotherapyMedicationsCycles,
  uniqueKey: 'ChemotherapyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'MedicationID', allowNull: false },
});


//5.Treatment plans read only & cyclesreadonly
treatmentPlanReadOnly.belongsToMany(CycleRead, {
  through: TreatmentPlanReadOnlyCycles,
  uniqueKey: 'ReadOnlyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'plan_ID', allowNull: false },
});

CycleRead.belongsToMany(treatmentPlanReadOnly, {
  through: TreatmentPlanReadOnlyCycles,
  uniqueKey: 'ReadOnlyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'cycle_ID', allowNull: false },
});

//6. chemotherapy-readonly with cycles-readonly
CycleRead.belongsToMany(ChemotherapyMedRead, {
  through: ChemotherapyCyclesReadonly,
  uniqueKey: 'ChemotherapyCyclesreadonly_unique', // Custom unique constraint name
  foreignKey: { name: 'cycle_ID', allowNull: false },
});
ChemotherapyMedRead.belongsToMany(CycleRead, {
  through: ChemotherapyCyclesReadonly,
  uniqueKey: 'ChemotherapyCyclesreadonly_unique', // Custom unique constraint name
  foreignKey: { name: 'medication_ID', allowNull: false },
});
// 7 premedications-readonly with cycles-readonly
CycleRead.belongsToMany(PremedicationRead, {
  through: PremedicationsCyclesReadonly,
  uniqueKey: 'PremedicationCyclesReadonly_unique', // Custom unique constraint name
  foreignKey: { name: 'cycle_ID', allowNull: false },
});
PremedicationRead.belongsToMany(CycleRead, {
  through: PremedicationsCyclesReadonly,
  uniqueKey: 'PremedicationCyclesReadonly_unique', // Custom unique constraint name
  foreignKey: { name: 'medication_ID', allowNull: false },
});

//====================One to Many=======================

//2. patients &Radiography
Patients.hasMany(Radiography, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Radiography.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//3. patients& medical analysis
Patients.hasMany(Medical, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Medical.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//4.patients & visits
Patients.hasMany(Visits, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Visits.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//========================One to One============================================
//1. Vital signs & patients
Patients.hasOne(VitalSign, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
VitalSign.belongsTo(Patients);
//2. patients & cancer overview
Patients.hasOne(CancerOverview, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
CancerOverview.belongsTo(Patients);
//3. patients & treatment plans
Patients.hasOne(TreatmentPlans, {
  foreignKey: {
    allowNull: false, // This makes the foreign key not null
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
TreatmentPlans.belongsTo(Patients);
//4. User & Doctor
Doctor.hasOne(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.belongsTo(Doctor);
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
  Medical,
  User,
  Doctor,
  Visits,
  ChemotherapyMedRead,
  CycleRead,
  PremedicationRead,
  
};

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
const MedicalAnaylsisModel = require('./MedicalAnalysis.models');
const UserModel = require('./User.models');
const DoctorModel = require('./Doctor.models');
const VisitsModel = require('./Visits.models');
//========================= M to N =======================
const PatientsReservedbedsModel = require('./PatientsReservedbeds.models');
const TreatmentPlansCyclesModel = require('./TreatmentPlansCycles.models');
const TreatmentPlanReadOnlyCyclesModel = require('./TreatmentPlanReadOnlyCycles.models');
const PremedicationsCyclesModel = require('./PremedicationsCycles.models');
const ChemotherapyMedicationsCyclesModel = require('./ChemotherapyMedicationsCycles.models');
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
const User = UserModel(db, Sequelize);
const Doctor = DoctorModel(db, Sequelize);
const Visits = VisitsModel(db, Sequelize);

//==========junction tables for M to N realtions==========
const PatientsReservedbeds = PatientsReservedbedsModel(db, Sequelize);
const TreatmentPlansCycles = TreatmentPlansCyclesModel(db, Sequelize);
const TreatmentPlanReadOnlyCycles = TreatmentPlanReadOnlyCyclesModel(
  db,
  Sequelize
);
const PremedicationsCycles = PremedicationsCyclesModel(db, Sequelize);
const ChemotherapyMedicationsCycles = ChemotherapyMedicationsCyclesModel(
  db,
  Sequelize
);

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

//3.Treatment plans read only & cycles
Cycles.belongsToMany(treatmentPlanReadOnly, {
  through: TreatmentPlanReadOnlyCycles,
  uniqueKey: 'ReadOnlyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'cycleID', allowNull: false },
});
treatmentPlanReadOnly.belongsToMany(Cycles, {
  through: TreatmentPlanReadOnlyCycles,
  uniqueKey: 'ReadOnlyCycles_unique', // Custom unique constraint name
  foreignKey: { name: 'planID', allowNull: false },
});

//4. cycles & premedications
Cycles.belongsToMany(Premedications, {
  through: PremedicationsCycles,
  foreignKey: { name: 'cycleID', allowNull: false },
});
Premedications.belongsToMany(Cycles, {
  through: PremedicationsCycles,
  foreignKey: { name: 'medicationID', allowNull: false },
});

//5. cycles & chemotherapy medications
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

//====================One to Many=======================

//2. patients &Radiography
Patients.hasMany(
  Radiography,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
Radiography.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//3. patients& medical analysis
Patients.hasMany(
  MedicalAnalysis,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
MedicalAnalysis.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//4.patients & visits
Patients.hasMany(
  Visits,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
Visits.belongsTo(Patients, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
//========================One to One============================================
//1. Vital signs & patients
Patients.hasOne(
  VitalSign,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
VitalSign.belongsTo(Patients);
//2. patients & cancer overview
Patients.hasOne(
  CancerOverview,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
CancerOverview.belongsTo(Patients);
//3. patients & treatment plans
Patients.hasOne(
  TreatmentPlans,
  {
    foreignKey: {
      allowNull: false, // This makes the foreign key not null
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
TreatmentPlans.belongsTo(Patients);
//4. User & Doctor
Doctor.hasOne(
  User,
  {
    foreignKey: {
      allowNull: false,
    },
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }
);
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
  MedicalAnalysis,
  User,
  Doctor,
  Visits,
};

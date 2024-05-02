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
  MedicalAnalysis
};

// import sequelize & schemas
const Sequelize = require('sequelize');
const db = require('../configs/db.config');
const TPReadOnlyModel= require('./TreatmentPlanReadOnly.models');
const CyclesModel= require('./Cycles.models');
const CancerModel= require('./CancerOverview.models');
const ChemotherapyModel= require('./ChemotherapyMedications.models');
const PatientsModel= require('./Patients.models');
const PremedicationsModel= require('./Premedications.models');
const TreatmentModel= require('./TreatmentPlans.models');
const ReservedBedsModel= require('./ReservedBeds.models');
const VitalSignModel= require('./VitalSign.models');



// create models
const  treatmentPlanReadOnly = TPReadOnlyModel(db,Sequelize)
const  Cycles = CyclesModel(db,Sequelize)
const  CancerOverview = CancerModel(db,Sequelize)
const  ChemotherapyMedications = ChemotherapyModel(db,Sequelize)
const  Patients =  PatientsModel(db,Sequelize)
const  ReservedBeds = ReservedBedsModel(db,Sequelize)
const  VitalSign =VitalSignModel(db,Sequelize)
const  Premedications = PremedicationsModel(db,Sequelize)
const  TreatmentPlans = TreatmentModel(db,Sequelize)

//models for many -> many
const PatientReservedBeds = db.define("patient_reservedBeds")
const CycleTreatmentPlans = db.define("cycle_treatmentPlans")
const defaultCycles = db.define("cycle_treatmentPlanReadOnly")
const CyclePremedications = db.define("cycle_premedications")
const CycleChemotherapy = db.define("cycle_chemotherapy")
const defaultPremedications = db.define("premedications_treatmentPlanReadOnly")
const PlansPremedications = db.define("premedications_treatmentPlans")


// define relationships
// Patients & ReservedBeds (many -> many)
Patients.belongsToMany(ReservedBeds, { through: PatientReservedBeds })
ReservedBeds.belongsToMany(Patients, { through: PatientReservedBeds })

// TreatmentPlans & Cycles (many -> many)
Cycles.belongsToMany(TreatmentPlans, { through: CycleTreatmentPlans })
TreatmentPlans.belongsToMany(Cycles, { through: CycleTreatmentPlans })

// treatmentPlanReadOnly & Cycles (many -> many)
Cycles.belongsToMany(treatmentPlanReadOnly, { through: defaultCycles })
treatmentPlanReadOnly.belongsToMany(Cycles, { through:defaultCycles })

// Premedications & Cycles (many -> many)
Cycles.belongsToMany(Premedications, { through: CyclePremedications })
Premedications.belongsToMany(Cycles, { through: CyclePremedications })

// ChemotherapyMedications & Cycles (many -> many)
Cycles.belongsToMany(ChemotherapyMedications, { through: CycleChemotherapy })
ChemotherapyMedications.belongsToMany(Cycles, { through: CycleChemotherapy })

// Premedications & treatmentPlanReadOnly(many -> many)
Premedications.belongsToMany(treatmentPlanReadOnly, { through: defaultPremedications })
treatmentPlanReadOnly.belongsToMany(Premedications, { through: defaultPremedications })

// Premedications & treatmentPlanReadOnly(many -> many)
Premedications.belongsToMany(TreatmentPlans, { through: PlansPremedications })
TreatmentPlans.belongsToMany(Premedications, { through: PlansPremedications })


// generate tables in DB
module.exports={
      treatmentPlanReadOnly,
      Cycles,
      CancerOverview,
      ChemotherapyMedications,
      Patients,
      ReservedBeds,
      VitalSign,
      Premedications,
      TreatmentPlans
}


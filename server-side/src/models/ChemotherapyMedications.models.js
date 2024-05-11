module.exports = (db, DataTypes) => {
  const ChemotherapyMedications = db.define('chemotherapyMedication', {
    Chemotherapy_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Medication_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Dose: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Route: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 25]
      }
    },
    Instructions: {
      type: DataTypes.TEXT('tiny')
    },
    Dosage_Reduction: {
      type: DataTypes.INTEGER
    },
    Administered_Dose_ml: {
      type: DataTypes.FLOAT
    },
    Administered_Dose_mg: {
      type: DataTypes.FLOAT
    },
    cycle_note: {
      type: DataTypes.TEXT
    }
  },{
    timestamps: false // Disable timestamps
  });

  return ChemotherapyMedications;
};

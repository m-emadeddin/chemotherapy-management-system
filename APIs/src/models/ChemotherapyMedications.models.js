module.exports = (db, DataTypes) => {
      const ChemotherapyMedications = db.define('chemotherapyMedication', {
        Chemotherapy_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        Medication_Name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        Dose: {
          type: DataTypes.INTEGER
        },
        Route: {
          type: DataTypes.STRING,
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
          type: DataTypes.INTEGER
        },
        Administered_Dose_mg: {
          type: DataTypes.INTEGER
        },
        cycle_note: {
          type: DataTypes.TEXT
        }
      });
    
      return ChemotherapyMedications;
    };
    
module.exports = (db, DataTypes) => {
    const ChemotherapyMedicationsRead = db.define('ChemotherapyMedRead', {
      Chemotherapy_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      Medication_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
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

    },{
      timestamps: false // Disable timestamps
    });
  
    return ChemotherapyMedicationsRead;
  };
  
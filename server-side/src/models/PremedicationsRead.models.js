module.exports = (db, DataTypes) => {
    const PremedicationRead = db.define('PremedicationRead', {
      Premed_ID: {
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
        allowNull: false,

      },
      Route: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 25]
        },
        allowNull: false,
      },
      Instructions: {
        type: DataTypes.TEXT('tiny')
      },
    });
  
    return PremedicationRead;
  };
  
module.exports = (db, DataTypes) => {
      const Premedication = db.define('premedication', {
        Premed_ID: {
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
      });
    
      return Premedication;
    };
    
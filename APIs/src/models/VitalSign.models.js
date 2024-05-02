module.exports = (db, DataTypes) => {
      const VitalSign = db.define('vitalSign', {
        Blood_Pressure: {
          type: DataTypes.FLOAT
        },
        Height: {
          type: DataTypes.FLOAT
        },
        Weight: {
          type: DataTypes.FLOAT
        },
        Heart_rate: {
          type: DataTypes.FLOAT
        },
        BMI: {
          type: DataTypes.FLOAT
        },
        Temp: {
          type: DataTypes.INTEGER
        },
        last_updated: {
          type: DataTypes.DATE
        },
        Chief_Complaint: {
          type: DataTypes.STRING(255)
        }
      });
    
      return VitalSign;
    };
    
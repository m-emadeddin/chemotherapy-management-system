module.exports = (db, DataTypes) => {
      const TreatmentPlan = db.define('treatmentPlan', {
        Plan_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        Plan_Name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        number_of_Weeks: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        number_of_Cycles: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      });
    
      return TreatmentPlan;
    };
    
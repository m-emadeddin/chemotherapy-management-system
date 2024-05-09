module.exports = (db, DataTypes) => {
      const Plan = db.define('treatmentPlanReadOnly', {
        Plan_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Plan_Name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number_of_Weeks: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        number_of_Cycles: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        Cancer_Type: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      });
      return Plan
}
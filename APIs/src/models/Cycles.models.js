module.exports = (db, DataTypes) => {
      const Cycle = db.define('cycle', {
        Cycle_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Cycle_Number: {
          type: DataTypes.INTEGER,
          unique: false
        },
        End_Date: {
          type: DataTypes.DATE,
          allowNull: false
        }
      });
      return Cycle;
    };
    
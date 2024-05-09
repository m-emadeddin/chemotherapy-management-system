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
    Start_Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Start_Time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    End_Time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  return Cycle;
};

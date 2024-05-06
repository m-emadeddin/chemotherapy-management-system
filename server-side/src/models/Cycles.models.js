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
      type: DataTypes.DATE
    },
    End_Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    },{
      timestamps: false // Disable timestamps
    });
   

  return Cycle;
};

module.exports = (db, DataTypes) => {
    const CycleRead = db.define('CycleRead', {
      Cycle_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Cycle_Number: {
        type: DataTypes.INTEGER,
        unique: false
      },
 
    });
  
    return CycleRead;
  };
  
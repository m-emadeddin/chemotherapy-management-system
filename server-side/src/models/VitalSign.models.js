module.exports = (db, DataTypes) => {
  const VitalSign = db.define('vitalSign', {
    VitalSigns_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    Blood_Pressure: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Heart_rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    BMI: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Temp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Chief_Complaint: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
   
  });

  return VitalSign;
};

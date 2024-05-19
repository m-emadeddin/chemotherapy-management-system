module.exports = (db, DataTypes) => {
  const Medical = db.define("Medical", {
    MedicalAnalysis_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Urinanalysis: {
      type: DataTypes.STRING(100),
    },
    CBC: {
      type: DataTypes.STRING(100),
    },
    Electrophoresis: {
      type: DataTypes.STRING(100),
    },
    CEA: {
      type: DataTypes.STRING(100),
    },
    AFP: {
      type: DataTypes.STRING(100),
    },
    B2M: {
      type: DataTypes.STRING(100),
    },
    Tumor_size :{
      type : DataTypes.FLOAT,
    }
  });
  return Medical;
};

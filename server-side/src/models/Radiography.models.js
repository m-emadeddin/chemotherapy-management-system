module.exports = (db, DataTypes) => {
  const Radiography = db.define("Radiography", {
    Radiography_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    MRI: {
      type: DataTypes.STRING(100),
    },
    CT: {
      type: DataTypes.STRING(100),
    },
    PET_CT: {
      type: DataTypes.STRING(100),
    },
    Ultrasound: {
      type: DataTypes.STRING(100),
    },
    XRay: {
      type: DataTypes.STRING(100),
    },
    Mammography: {
      type: DataTypes.STRING(100),
    },
    DEXA: {
      type: DataTypes.STRING(100),
    }
  });

  return Radiography;
};

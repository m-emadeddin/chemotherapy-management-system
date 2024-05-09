module.exports = (db, DataTypes) => {
  const CancerOverview = db.define('cancerOverview', {
    Cancer_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cancer_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note_On_cancer: {
      type: DataTypes.TEXT
    },
  });

  return CancerOverview;
};

module.exports = (db, DataTypes) => {
  const CancerOverview = db.define('cancerOverview', {
      Stage: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true  //composite DataType as Pk
      },
      Cancer_type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true  //composite DataType as Pk
      },
    
      Note_On_cancer: {
        type: DataTypes.TEXT
      }},);
      return CancerOverview;
    };
    
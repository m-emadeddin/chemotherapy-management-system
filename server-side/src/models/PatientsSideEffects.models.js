module.exports = (sequelize, DataTypes) => {
    const PatientsSideEffect = sequelize.define('PatientsSideEffect', {
        PatientSideEffects_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      timestamps: false // Prevent creation of created at and updated at 
    });
  
    return PatientsSideEffect;
  };
  
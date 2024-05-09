module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      Doctor_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      speciality: {
        type: DataTypes.STRING(255)
      },
      license_number: {
        type: DataTypes.STRING(255)
      },
      id_profile: {
        type: DataTypes.INTEGER
      }
    });
  
    return Doctor;
  };
  
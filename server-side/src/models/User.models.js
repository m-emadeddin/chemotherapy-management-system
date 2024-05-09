module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      Username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  
    return User;
  };
  
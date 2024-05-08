module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      email: {
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
  
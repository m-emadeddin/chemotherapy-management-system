module.exports = (sequelize, DataTypes) => {
    const SideEffect = sequelize.define('SideEffect', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      Nausea: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Loss_of_appetite: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Hair_loss: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Gastrointestinal_disturbances: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Loss_of_memory: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Skin_change: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Blood_cell_loss: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Psychological_effects: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      },
      Changes_in_kidney_and_liver_function: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isIn: [['High', 'Low', 'Moderate']]
        }
      }
    },{
        timestamps: false
    });
    return SideEffect;
  };
  
module.exports = (sequelize, DataTypes) => {
    const Visit = sequelize.define('Visit', {
      Visit_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      visit_time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'add a trigger when any update happens, insert into this column NOW()'
      }
    });
  
    // Adding hook to update visit_time on each update
    Visit.addHook('beforeUpdate', 'updateVisitTime', (visit, options) => {
      visit.visit_time = new Date();
    });
  
    return Visit;
  };
  
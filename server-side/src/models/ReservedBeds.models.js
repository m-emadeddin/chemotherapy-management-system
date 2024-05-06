module.exports = (db, DataTypes) => {
      const ReservedBed = db.define('reservedbed', {
        Bed_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false
        },
        Availability_Status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      });
    
      return ReservedBed;
    };

    
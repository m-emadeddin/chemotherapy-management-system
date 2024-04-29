module.exports = (db, DataTypes) => {
      const Patient = db.define('patient', {
        Patient_ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
        
      });
    
      return Patient;
    };
    
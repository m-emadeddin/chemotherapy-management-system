module.exports = (db, DataTypes) => {
  const Patient = db.define('patient', {
    Patient_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    blood_type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    disease_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    governorate: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{
    timestamps:false
  });

  return Patient;
};

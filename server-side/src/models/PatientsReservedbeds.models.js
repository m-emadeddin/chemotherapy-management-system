module.exports = (db, DataTypes) => {
const PatientsReservedbeds = db.define('patients-reservedbeds', {
    PatientReservedbed_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    ReservationDate: {
        type: DataTypes.DATE,
        allowNull: false 
    },
    HoursReserved: {
        type: DataTypes.INTEGER,
        allowNull: false 
    }
}, {
    timestamps: false // Prevent creation of created at and updated at 
});
return PatientsReservedbeds;
};
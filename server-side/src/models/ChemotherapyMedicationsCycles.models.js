module.exports = (db, DataTypes) => {
const ChemotherapyMedicationsCycles = db.define('ChemotherapyMedications-Cycles', {
    ChemotherapyCycle_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false,
});

return ChemotherapyMedicationsCycles;
};

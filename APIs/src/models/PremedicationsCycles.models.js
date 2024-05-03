module.exports = (db, DataTypes) => {
const PremedicationsCycles = db.define('Premedications-Cycles', {
    PremedicationCycle_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false 
});
return PremedicationsCycles;
};

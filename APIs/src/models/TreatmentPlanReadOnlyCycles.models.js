module.exports = (db, DataTypes) => {
const TreatmentPlanReadOnlyCycles = db.define('TreatmentPlanReadOnly-Cycles', {
    ReadOnlyCycle_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false 
});
return TreatmentPlanReadOnlyCycles;
};

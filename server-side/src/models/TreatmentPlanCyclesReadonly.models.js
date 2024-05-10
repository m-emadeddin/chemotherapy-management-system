module.exports = (db, DataTypes) => {
const TreatmentPlanReadOnlyCycles = db.define('TreatmentPlan-Cycles-ReadOnly', {
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

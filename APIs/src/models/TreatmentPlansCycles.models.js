module.exports = (db, DataTypes) => {
const TreatmentPlansCycles = db.define('TreatmentPlans-Cycles', {
    TreatmentPlanCycle_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false 
});
return TreatmentPlansCycles;
};
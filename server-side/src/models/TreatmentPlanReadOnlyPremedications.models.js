module.exports = (db, DataTypes) => {
const TreatmentPlanReadOnlyPremedications = db.define('TreatmentPlanReadonly-Premedications', {
    ReadOnlyPremedications_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false 
});
return TreatmentPlanReadOnlyPremedications;
};

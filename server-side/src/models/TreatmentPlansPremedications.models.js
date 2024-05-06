module.exports = (db, DataTypes) => {
const TreatmentPlansPremedications = db.define('TreatmentPlans-Premedication', {
    TreatmentPlanPremedication_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
}, {
    timestamps: false 
});
return TreatmentPlansPremedications;
};


    
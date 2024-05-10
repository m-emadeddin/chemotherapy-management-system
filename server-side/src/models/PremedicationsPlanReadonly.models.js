module.exports = (db, DataTypes) => {
    const PremedicationsPlanReadonly = db.define('Premedications-Plan-readonly', {
        PremedicationPlan_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
    }, {
        timestamps: false 
    });
    return PremedicationsPlanReadonly;
    };
    
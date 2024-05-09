module.exports = (db, DataTypes) => {
    const PremedicationsCyclesReadonly = db.define('Premedications-Cycles-readonly', {
        PremedicationCycle_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
    }, {
        timestamps: false 
    });
    return PremedicationsCyclesReadonly;
    };
    
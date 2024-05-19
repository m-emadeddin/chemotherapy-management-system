module.exports = (db, DataTypes) => {
    const ChemotherapyPlanReadonly = db.define('Chemotherapy-Plan-Readonly', {
        ChemotherapyCycle_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
    }, {
        timestamps: false,
    });
    
    return ChemotherapyPlanReadonly;
    };
    
module.exports = (db, DataTypes) => {
    const ChemotherapyCyclesReadonly = db.define('Chemotherapy-Cycles-Readonly', {
        ChemotherapyCycle_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
    }, {
        timestamps: false,
    });
    
    return ChemotherapyCyclesReadonly;
    };
    
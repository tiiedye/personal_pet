module.exports = function(sequelize, DataType) {
    var Activity = sequelize.define("Activity", {
        activityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
        freezeTableName: true
    });
    return Activity;
}
module.exports = function(sequelize, DataTypes) {
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
        }
    },
        {
            freezeTableName: true
        }
    );

    Activity.associate = function(models) {
        Activity.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Activity;
}
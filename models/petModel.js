module.exports = function(sequelize, DataTypes) {
    var Sidekick = sequelize.define("Sidekick", {
        
        sidekickName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        happinessPoints: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        sidekickImage: DataTypes.STRING
    },
    {

    freezeTableName: true

    });
    return Sidekick;
}



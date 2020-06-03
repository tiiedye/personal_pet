module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
        sidekickName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        happinessPoints: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sidekickImage: DataTypes.STRING
    },
    {

    freezeTableName: true

    });
    return Pet;
}



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
        sidekickImage: {
            type:DataTypes.STRING,
            allowNull: false
        } 
    },
        
        
        {

        freezeTableName: true
        

    });

    Sidekick.associate = function(models) {
        Sidekick.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Sidekick;
}



module.exports = function(sequelize, DataTypes) {
    var Graph = sequelize.define("Graph", {
        happinessPoints: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
 
        freezeTableName: true,
        timestamps:false
    });



    Graph.associate = function(models) {
        Graph.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Graph;
}
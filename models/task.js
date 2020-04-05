module.exports = (sequelize, DataTypes) => {

    const Tasks = sequelize.define('Tasks', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Tasks',
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Projects, {foreignKey: 'projectId'});
        Tasks.belongsTo(models.Users, {foreignKey: 'userId'});
        Tasks.belongsTo(models.Statuses, {foreignKey: 'statusId', as: 'status'});
    }

    return Tasks;
}

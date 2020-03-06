module.exports = (sequelize, DataTypes) => {

    const Items = sequelize.define('Items', {
        name: DataTypes.STRING,
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Items',
    });

    Items.associate = (models) => {
        Items.belongsTo(models.Tasks, {foreignKey: 'taskId'});
    }

    return Items;
}

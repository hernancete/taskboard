module.exports = (sequelize, DataTypes) => {

    const Statuses = sequelize.define('Statuses', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Statuses',
    });

    return Statuses;
}

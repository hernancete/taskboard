const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Status extends Sequelize.Model {}

    Status.init({
        name: Sequelize.STRING,
        description: Sequelize.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Statuses',
    });

    return Status;
}

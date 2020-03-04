const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Task extends Sequelize.Model {}

    Task.init({
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Tasks',
    });

    return Task;
}

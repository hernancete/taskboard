const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Project extends Sequelize.Model {}

    Project.init({
        name: Sequelize.STRING,
        description: Sequelize.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Projects',
    });

    const User = sequelize.import('./user');
    Project.belongsToMany(User, {through: 'UserProjects'});

    return Project;
}

module.exports = (sequelize, DataTypes) => {

    const Projects = sequelize.define('Projects', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Projects',
    });

    // Projects.associate = (models) => {
    //     Projects.belongsToMany(models.Users, {as: 'Users', through: 'UserProjects', foreignKey: 'userId' });
    // };

    return Projects;
}

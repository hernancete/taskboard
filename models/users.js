module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Users',
        indexes: [
            {
                fields: ['email'],
                unique: true,
            },
        ],
    });

    // Users.associate = (models) => {
    //     Users.belongsToMany(models.Projects, {as: 'Projects', through: 'UserProjects', foreignKey: 'projectId'});
    // };

    return Users;
}

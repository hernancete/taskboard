const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class User extends Sequelize.Model {}

    User.init({
        name: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
        },
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

    return User;
}

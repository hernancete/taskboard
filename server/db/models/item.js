const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    class Item extends Sequelize.Model {}

    Item.init({
        name: Sequelize.STRING,
        done: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        freezeTableName: true,
        tableName: 'Items',
    });

    return Item;
}

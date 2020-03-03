'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Projects", deps: []
 * createTable "Users", deps: []
 * createTable "UserProjects", deps: [Projects, Users]
 * addIndex "users_email" to table "Users"
 *
 **/

var info = {
    "revision": 1,
    "name": "user",
    "created": "2020-03-03T00:32:43.332Z",
    "comment": ""
};

var migrationCommands = function(transaction) {
    return [{
            fn: "createTable",
            params: [
                "Projects",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "description": {
                        "type": Sequelize.STRING,
                        "field": "description"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "Users",
                {
                    "id": {
                        "type": Sequelize.INTEGER,
                        "field": "id",
                        "autoIncrement": true,
                        "primaryKey": true,
                        "allowNull": false
                    },
                    "name": {
                        "type": Sequelize.STRING,
                        "field": "name"
                    },
                    "lastName": {
                        "type": Sequelize.STRING,
                        "field": "lastName"
                    },
                    "email": {
                        "type": Sequelize.STRING,
                        "field": "email"
                    },
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "createTable",
            params: [
                "UserProjects",
                {
                    "createdAt": {
                        "type": Sequelize.DATE,
                        "field": "createdAt",
                        "allowNull": false
                    },
                    "updatedAt": {
                        "type": Sequelize.DATE,
                        "field": "updatedAt",
                        "allowNull": false
                    },
                    "ProjectId": {
                        "type": Sequelize.INTEGER,
                        "field": "ProjectId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Projects",
                            "key": "id"
                        },
                        "primaryKey": true
                    },
                    "UserId": {
                        "type": Sequelize.INTEGER,
                        "field": "UserId",
                        "onUpdate": "CASCADE",
                        "onDelete": "CASCADE",
                        "references": {
                            "model": "Users",
                            "key": "id"
                        },
                        "primaryKey": true
                    }
                },
                {
                    "transaction": transaction
                }
            ]
        },
        {
            fn: "addIndex",
            params: [
                "Users",
                ["email"],
                {
                    "indexName": "users_email",
                    "name": "users_email",
                    "indicesType": "UNIQUE",
                    "type": "UNIQUE",
                    "transaction": transaction
                }
            ]
        }
    ];
};
var rollbackCommands = function(transaction) {
    return [{
            fn: "dropTable",
            params: ["Projects", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["UserProjects", {
                transaction: transaction
            }]
        },
        {
            fn: "dropTable",
            params: ["Users", {
                transaction: transaction
            }]
        }
    ];
};

module.exports = {
    pos: 0,
    useTransaction: true,
    execute: function(queryInterface, Sequelize, _commands)
    {
        var index = this.pos;
        function run(transaction) {
            const commands = _commands(transaction);
            return new Promise(function(resolve, reject) {
                function next() {
                    if (index < commands.length)
                    {
                        let command = commands[index];
                        console.log("[#"+index+"] execute: " + command.fn);
                        index++;
                        queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                    }
                    else
                        resolve();
                }
                next();
            });
        }
        if (this.useTransaction) {
            return queryInterface.sequelize.transaction(run);
        } else {
            return run(null);
        }
    },
    up: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, migrationCommands);
    },
    down: function(queryInterface, Sequelize)
    {
        return this.execute(queryInterface, Sequelize, rollbackCommands);
    },
    info: info
};

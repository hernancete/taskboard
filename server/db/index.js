// const mysql = require('mysql');

// // Create connection
// const connectionConfig = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// };
// const db = mysql.createConnection(connectionConfig);

// // Connect
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database', connectionConfig);
//         throw err;
//     }
// });

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
});

const checkDBConn = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
};

const User = sequelize.import('./models/user');

module.exports = {
    sequelize,
    checkDBConn,
    User,
}

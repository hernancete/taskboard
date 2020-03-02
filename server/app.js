require('dotenv').config()
const express = require('express');
const {checkDBConn, User} = require('./db');

try {
    checkDBConn();
} catch(err) {
    console.error('Unable to connect to the database:', err);
}

const app = express();

app.listen(process.env.APP_PORT, () => console.log('App listening on port ' + process.env.APP_PORT));

User.findAll()
    .then((users) => console.log(users))
    .catch((err) => console.error(err));

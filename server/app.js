require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const {errorHandler} = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);
app.use(errorHandler);

app.listen(process.env.APP_PORT, () => console.log('App listening on port ' + process.env.APP_PORT));

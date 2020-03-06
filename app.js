require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares');

const db = require('./models');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const syncDB = async (force) => {
    // await db.Statuses.sync({force: force});
    // await db.Projects.sync({force: force});
    // await db.Users.sync({force: force});
    // await db.Tasks.sync({force: force});
    // await db.Items.sync({force: force});
}

// db.sequelize.sync({force: false})
syncDB(false)
    .then(() => {
        console.log('Database syncronized!');
        app.listen(process.env.APP_PORT, () => {
            console.log('App listening on port ' + process.env.APP_PORT);
        });
    })
    .catch((err) => {
        console.error('Something went wrong initializing DB or Server.');
        console.error(err);
    })


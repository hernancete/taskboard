const routes = require('express').Router();
const users = require('./users');
const projects = require('./projects');
const statuses = require('./statuses');
const tasks = require('./tasks');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

routes.use('/users', users);
routes.use('/projects', projects);
routes.use('/statuses', statuses);
routes.use('/tasks', tasks);

module.exports = routes;

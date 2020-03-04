const routes = require('express').Router();
const users = require('./users');
const projects = require('./projects');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Connected!'});
});

routes.use('/users', users);
routes.use('/projects', projects);

module.exports = routes;

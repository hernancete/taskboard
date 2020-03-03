const routes = require('express').Router();
const {Project} = require('../db');

routes.get('/', async (req, res, next) => {
    try {
        let projects = await Project.findAll();
        return res.status(200).json(projects);
    }
    catch (err) {
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        let project = await Project.create(req.body);
        return res.status(200).json(project);
    }
    catch (err) {
        next(err);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        let project = await Project.findByPk(req.params['id']);
        if (project) {
            await project.destroy();
            return res.status(200).json(project);
        }
        res.status(404);
        throw new Error('Project not found');
    }
    catch (err) {
        next(err);
    }
});

module.exports = routes;

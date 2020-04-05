const routes = require('express').Router();
const { Tasks, Statuses } = require('../models');

routes.get('/', async (req, res, next) => {
    try {
        let tasks = await Tasks.findAll({
            where: req.query,
            include: [{
                model: Statuses,
                as: 'status',
            }],
        });
        return res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500);
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        let data = Object.assign({}, req.body);
        if (!data.statusId) {
            data.statusId = 1;
        }
        let task = await Tasks.create(data);
        return res.status(200).json(task);
    }
    catch (err) {
        next(err);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        let task = await Tasks.findByPk(req.params['id']);
        if (task) {
            await task.destroy();
            return res.status(200).json(task);
        }
        res.status(404);
        throw new Error('Task not found');
    }
    catch (err) {
        next(err);
    }
});

module.exports = routes;

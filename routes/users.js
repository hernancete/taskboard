const routes = require('express').Router();
const { Users } = require('../models');

routes.get('/', async (req, res, next) => {
    try {
        let users = await Users.findAll();
        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        let user = await Users.create(req.body);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        let user = await Users.findByPk(req.params['id']);
        if (user) {
            await user.destroy();
            return res.status(200).json(user);
        }
        res.status(404);
        throw new Error('User not found');
    }
    catch (err) {
        next(err);
    }
});

module.exports = routes;

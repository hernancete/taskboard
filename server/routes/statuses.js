const routes = require('express').Router();
const { Statuses } = require('../models');

routes.get('/', async (req, res, next) => {
    try {
        let regs = await Statuses.findAll();
        return res.status(200).json(regs);
    }
    catch (err) {
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        let newReg = await Statuses.create(req.body);
        return res.status(200).json(newReg);
    }
    catch (err) {
        next(err);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        let reg = await Statuses.findByPk(req.params['id']);
        if (reg) {
            await reg.destroy();
            return res.status(200).json(reg);
        }
        res.status(404);
        throw new Error('Status not found');
    }
    catch (err) {
        next(err);
    }
});

module.exports = routes;

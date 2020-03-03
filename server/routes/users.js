const routes = require('express').Router();
const {checkDBConn, User} = require('../db');

// try {
//     checkDBConn();
// } catch(err) {
//     console.error('Unable to connect to the database:', err);
// }

routes.get('/', async (req, res, next) => {
    try {
        let users = await User.findAll();
        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
});

routes.post('/', async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});

routes.delete('/:id', async (req, res, next) => {
    try {
        let user = await User.findByPk(req.params['id']);
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

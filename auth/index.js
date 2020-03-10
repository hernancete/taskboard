const { jwtSign, hashPassword, validatePassword } = require('./utils');
const { Users } = require('../models');
const routes = require('express').Router();

routes.post('/login', async (req, res) => {
    const _error = 'Login failed';
    if (!req.body.username || !req.body.password) {
        const _message = 'Username and/or password not provided';
        console.log(`${_error}. ${_message}`);
        return res.status(400).json({
            error: _error,
            message: _message,
        });
    }
    try {
        let user = await Users.findOne({
            where: {
                username: req.body.username,
            }
        });
        const valid = await validatePassword(req.body.password, user.password);
        if (!valid) {
            const _message = 'Wrong username and/or password';
            console.log(`${_error}. ${_message}`);
            return res.status(400).json({
                error: _error,
                message: _message,
            });
        }
        delete user.password;
        let token = jwtSign({ user: user });
        return res.status(200).json({
            message: 'Login succeded',
            token: token
        });
    }
    catch (err) {
        console.log(`${_error}`, err.message);
        return res.status(401).json({ error: _error });
    };

});

routes.post('/register', async (req, res) => {
    const _error = 'Registration failed';
    if (!req.body.username || !req.body.password || !req.body.name || !req.body.email) {
        const _message = 'Some fields were not provided';
        console.log(`${_error}. ${_message}`);
        return res.status(400).json({
            error: _error,
            message: _message,
        });
    }
    try {
        let hashedPassword = await hashPassword(req.body.username);
        let user = await Users.create({
            name: req.body.name,
            lastName: req.body.lastName || '',
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });
        delete user.password;
        let token = jwtSign({ user: user });
        return res.status(200).json({
            message: 'Registration succeded',
            token: token
        });
    }
    catch (err) {
        console.log(_error, err.message);
        return res.status(401).json({
            error: _error,
            message: err.message,
        });
    };
});

module.exports = routes;

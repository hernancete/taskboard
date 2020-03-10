const { jwtDecode } = require('../auth/utils');

const notFound = (req, res) => {
    return res.status(404).json({
        message: 'Not found',
        requestedMethod: req.method,
        requestedUrl: req.url,
    });
};

const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'production'? {} : err.stack,
    });
};

const checkUser = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authentication'];
    console.log('token', token);
    try {
        let decoded = jwtDecode(token);
        req.user = decoded.user;
        return next();
    }
    catch (err) {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }
}

module.exports = {
    notFound,
    errorHandler,
    checkUser,
};

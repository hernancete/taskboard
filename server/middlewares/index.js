
const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV === 'production'? {} : err.stack,
    });
};

module.exports = {
    errorHandler,
};

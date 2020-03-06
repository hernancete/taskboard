
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

module.exports = {
    notFound,
    errorHandler,
};

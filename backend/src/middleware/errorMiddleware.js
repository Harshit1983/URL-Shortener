function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        err.message = 'Resource not found';
    }

    console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production'
            ? '🥞'
            : err.stack
    });
}

module.exports = errorHandler;
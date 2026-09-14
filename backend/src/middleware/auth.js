const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;

    // User is not logged in.
    // Continue because some routes can be accessed without authentication.
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);

        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
}

module.exports = { authUser };
const jwt = require('jsonwebtoken');

async function authUser(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded.user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
}


function optionalAuth(req, res, next) {

    const authHeader = req.headers.authorization;

    // User is not logged in
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }

    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded.user;

    } catch (error) {

        // Invalid/expired token is treated as guest
        req.user = null;
    }

    next();
}


module.exports = {
    authUser,
    optionalAuth
};
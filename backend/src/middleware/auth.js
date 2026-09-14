const jwt = require('jsonwebtoken');

async function authUser(req, res, next) {

    const authHeader = req.headers.authorization;

    console.log(
        'Authorization header:',
        authHeader ? 'PRESENT' : 'MISSING'
    );

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

        console.log('JWT verified successfully');

        req.user = decoded.user;

        next();

    } catch (error) {

        console.log(
            'JWT verification failed:',
            error.message
        );

        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
}

module.exports = {
    authUser
};
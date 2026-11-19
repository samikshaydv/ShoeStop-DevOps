
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized to access this route'
        });
    }
});

module.exports = authenticationMiddleware;

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const tokenBlacklist = new Set();

module.exports = (req, res, next) => {
    // Get token from request header
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or invalid format' });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ error: 'Token revoked. Please login again' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId; 
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports.blacklistToken = (token) => {
    tokenBlacklist.add(token);
};

module.exports.removeFromBlacklist = (token) => {
    tokenBlacklist.delete(token);
};

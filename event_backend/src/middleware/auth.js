const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

/**
 * Express middleware to verify JWT and set req.user.
 */
function authenticateJWT(req, res, next) {
  // PUBLIC_INTERFACE
  /** Middleware that checks for valid JWT, sets req.user */
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });
    const user = userModel.getUserById(decoded.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  });
}

module.exports = { authenticateJWT };

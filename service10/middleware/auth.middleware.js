// middleware/auth.middleware.js

const jwt = require('jsonwebtoken'); // Import JWT to verify tokens

/**
 * Middleware to protect routes using JWT authentication
 * Extracts token from Authorization header, verifies it,
 * and attaches user info to request object.
 */
module.exports = function (req, res, next) {
  // Get token from Authorization header (format: Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1];

  // If no token found, deny access
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    // Verify and decode the token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object for later use
    req.user = decoded;              // Contains user id and tenantId
    req.tenantId = decoded.tenantId; // Extract tenantId directly

    // Move to the next middleware/route
    next();
  } catch (err) {
    // If verification fails, return unauthorized
    res.status(401).json({ message: 'Invalid token' });
  }
};
const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT token
const authMiddleware = (req, res, next) => {
  console.log('Auth Middleware Running');  // Log to check if it's being called
  const token = req.header('Authorization');

  // Log token to debug
  console.log('Authorization Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  const jwtSecret = process.env.JWT_SECRET_KEY;
  console.log('JWT_SECRET_KEY From .env', jwtSecret);  // Should print the secret key

  try {
    // Decode the token using the JWT secret key from environment
    const decoded = jwt.verify(token, jwtSecret);
    
    // Log decoded token to see if user info is there
    console.log('Decoded Token:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

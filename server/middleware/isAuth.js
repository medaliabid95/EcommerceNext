const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Get the token from the cookies
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      // Verify and decode the token
      const decodedToken = jwt.verify(token, 'your_secret_key');

      // Check if the decoded token has the required role
      if (decodedToken.role !== requiredRole) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // If the role is valid, pass the control to the next middleware
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  };
};

module.exports = authMiddleware;

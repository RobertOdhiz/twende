import jwt from 'jsonwebtoken';

/**
 * Middleware to protect routes by verifying JWT tokens.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: 'Unauthorized request, try again' });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error?.message });
  }
};

/**
 * Middleware to restrict access based on user roles.
 * @param {...string} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function that checks if the user has the required role.
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You are not allowed to perform this task' });
    }
    next();
  };
};
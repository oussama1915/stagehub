const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      // req.user vient de authMiddleware
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (req.user.role !== requiredRole) {
        return res.status(403).json({
          message: "Forbidden: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};

export default roleMiddleware;
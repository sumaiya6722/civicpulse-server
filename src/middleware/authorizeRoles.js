
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check whether the user has an allowed role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    next();
  };
};

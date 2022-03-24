const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded._id)
      .then((user) => {
        if (user) {
          req.user = decoded;
          next();
        } else res.status(401).json({ message: "Invalid token" });
      })
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};

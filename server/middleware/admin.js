const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
    next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: "Access Forbidden." });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

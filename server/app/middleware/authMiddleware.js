// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require("../../models");
const secretKey = "melly"; 

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token not provided." });
    }
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findOne({ where: { id: decoded.user.id } });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid token." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { authenticateUser };

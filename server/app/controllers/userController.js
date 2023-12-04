const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const secretKey = "melly";

async function getUserInfo(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const { id, name, email, avatar_url } = decoded.user;

    const user = await User.findByPk(id, {
      attributes: ["traineeCodwarsUsername"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userInfo = {
      id,
      name,
      email,
      avatar_url,
      traineeCodwarsUsername: user.traineeCodwarsUsername,
    };

    res.json({ userInfo });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { getUserInfo };

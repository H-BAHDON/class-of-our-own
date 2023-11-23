
const jwt = require('jsonwebtoken');
secretKey = "melly";


function getUserInfo(req, res) {
  // console.log('Request Headers:', req.headers);

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const { id, name, email, traineeGithubAccount } = decoded.user;
  
    const userInfo = {
      id,
      name,
      email,
      username: traineeGithubAccount,
    };
  
    res.json({ userInfo });
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { getUserInfo };

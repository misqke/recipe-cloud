const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({message: "You must be logged in to do this."})
  }
  jwt.verify(token, `${process.env.JWT_SECRET}`, (error, user) => {
    if (error) {
      return res.status(403).json(error);
    }
    req.user = user;
    console.log("authentication successfull")
    next();
  })
}

module.exports = authenticateToken;
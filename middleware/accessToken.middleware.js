const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(accessToken)

  if (!accessToken) {
    return res.status(401).json({
      message: "access token not found",
    });
  }

  jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "invalid access token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyAccessToken;

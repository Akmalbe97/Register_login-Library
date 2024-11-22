const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAdmin = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    req.email = decoded;

    if (req.email.role !== "admin") {
      return res.json({
        message: "You are not admin",
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return next();
};

module.exports =  checkAdmin ;

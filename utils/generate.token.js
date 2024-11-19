const jwt = require("jsonwebtoken")
require ("dotenv").config()
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: process.env.ACCESS_JWT_TIME})
}

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: process.env.REFRESH_JWT_TIME})
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}
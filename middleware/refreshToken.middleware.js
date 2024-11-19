const jwt = require("jsonwebtoken")
const {generateAccessToken} = require("../utils/generate.token")

const verifyRefreshToken = (req, res) => {
  const token = req.cookies.refreshToken

  if(!token) {
    return res.status(401).json({
      message: "refresh token not found, login again"
    })
  }

  const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY)
  req.user = decoded

  if(!decoded) {
    return res.status(403).json({
      message: "Invalid refresh token or expired"
    })
  }
  const accessToken = generateAccessToken({id: decoded.id, email: decoded.email, role: decoded.role})
  res.cookie("accessToken", accessToken, {httpOnly: true, maxAge: process.env.COOKIE_ACCESS_TIME})

  res.json({
    message: "refresh token updated",
    accessToken
  })
}

module.exports = verifyRefreshToken
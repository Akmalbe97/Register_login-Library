const { Router } = require("express");
const { register, verify, login } = require("../controller//auth.controller");
const {authValidator} = require("../Validator/auth.validate");
const verifyRefreshToken = require("../middleware/refreshToken.middleware");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login", login);
authRouter.post("/refresh", verifyRefreshToken);

module.exports = authRouter;
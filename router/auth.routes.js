const { Router } = require("express");
const { register, verify, login } = require("../controller//auth.controller");
const {authValidator} = require("../Validator/auth.validate")

const authRouter = Router();

authRouter.post("/register",authValidator, register);
authRouter.post("/verify", verify);
authRouter.post("/login",authValidator, login);

module.exports = authRouter;
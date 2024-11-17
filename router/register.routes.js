const { Router } = require("express");
const { register, login } = require("../controller/register.controller");

const registerRouter = Router();

registerRouter.post("/register", register);
registerRouter.post("/login", login);

module.exports = registerRouter;
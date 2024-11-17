const RegisterSchemas = require("../schemas/register.schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, phone, email, password, role} = req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (foundUser) {
      return res.json({
        message: "User has already registered",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    await RegisterSchemas.create({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
      role
    });

    res.json({
      message: "Added new user",
    });
  } catch (err) {
    next(err);
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

const foundUser = await RegisterSchemas.findOne({ email: email });

    if (!foundUser) {
      return res.json({
        message: "User not found",
      });
    }

    const decrypt = await bcryptjs.compare(password, foundUser.password);

    if (!decrypt) {
      res.json({
        message: "Wrong password",
      });
    }

    if (decrypt) {
      const token = jwt.sign(
        {
          email: foundUser.email,
          role: foundUser.role,
        },
        process.env.SECRET_KET,
        { expiresIn: "2h" }
      );

      res.json({
        message: "Success",
        token: token,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  register,
  login,
};

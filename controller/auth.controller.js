const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const AuthSchema = require("../schemas/auth.schema");
const {generateAccessToken, generateRefreshToken} = require("../utils/generate.token")
require("dotenv").config();
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundUser = await AuthSchema.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_GOOGLE_PASS_KEY,
      },
    });

    const randomNumber = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const sendEmail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification code",
      text: `Your verification code: ${randomNumber}`,
    };

    try {
      await transporter.sendMail(sendEmail);
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email", error: error.message });
    }

    const hash = await bcryptjs.hash(password, 12);

    const userRegister = await AuthSchema.create({
      username,
      email,
      password: hash,
      verify_code: randomNumber,
    });

    setTimeout(async () => {
      await AuthSchema.findByIdAndUpdate(userRegister._id, { verify_code: "" });
    }, 60 * 1000000);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, verify_code_client } = req.body;

    const foundUser = await AuthSchema.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (foundUser.verify_code === verify_code_client) {
      await AuthSchema.findByIdAndUpdate(foundUser._id, { verify: true, verify_code: "" });

      return res.status(200).json({
        message: "Successfully verified",
      });
    } else {
      return res.status(400).json({ message: "Verification code is incorrect or not exsist" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await AuthSchema.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkPassword = await bcryptjs.compare(password, foundUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (foundUser.verify === true) {
      
      const accessToken = generateAccessToken({id: foundUser._id, role: foundUser.role, email: foundUser.email})

      const refreshToken = generateRefreshToken({id: foundUser._id, email: foundUser.email, role: foundUser.role})
      
      res.cookie("accessToken", accessToken, {httpOnly: true, maxAgs: process.env.COOKIE_ACCESS_TIME})
      res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAgs: process.env.COOKIE_REFRESH_TIME})
    
      return res.status(200).json({
        message: "Login successful",
        tokens: {
          accessToken
        }
      });
    }else {
        return res.status(403).json({ message: "You are not verified" });
    }
    } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verify,
  login,
};

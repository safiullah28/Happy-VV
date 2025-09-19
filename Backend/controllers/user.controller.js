import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import resetPasswordMail from "../nodemailer/resetPassEmail.js";
import generateOtp from "../nodemailer/otpEmail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateToken } from "../middlewares/generateToken.middleware.js";

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const register = async (req, res) => {
  try {
    const { username, email } = req.body;
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const otp = generateOTP();
    const otpExpire = Date.now() + 1000 * 60 * 10;
    const user = await User.create({
      email,
      username,
      otpCode: otp,
      otpExpire,
      isVerified: false,
    });
    generateOtp(email, otp);
    setTimeout(async () => {
      const checkUser = await User.findById(user._id);
      if (checkUser && !checkUser.isVerified) {
        await User.findByIdAndDelete(checkUser._id);
        console.log(`User deleted due to unverified otp`);
      }
    }, 1000 * 60 * 10);
    res.status(201).json({
      message: `Your OTP has send to your email : ${email}`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in register controller : ${error.message}`,
    });
    console.log(`Error in register controller : ${error}`);
  }
};

export const verifiesOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `User not exists`,
      });
    }
    if (Date.now() > user.otpExpire) {
      await User.findByIdAndDelete(user._id);
      return res.status(200).json({
        message: `OTP expired. User deleted`,
      });
    }
    console.log(Number(otpCode));
    if (Number(otpCode) !== Number(user.otpCode)) {
      return res.status(400).json({
        message: `Wrong otp`,
      });
    }
    user.isVerified = true;
    user.otpCode = null;
    user.otpExpire = null;
    await user.save();
    res.status(200).json({
      message: `User email has been verified`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in verifiesOtp controller : ${error.message}`,
    });
    console.log(`Error in verifiesOtp controller : ${error}`);
  }
};

export const setPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: `User not exists`,
      });
    }
    if (!user.isVerified) {
      res.status(400).json({
        message: `User is not verified. Please verify OTP first`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    user.password = hashPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password set successfully. Registration complete." });
  } catch (error) {
    res.status(500).json({
      message: `Error in verifiesOtp controller : ${error.message}`,
    });
    console.log(`Error in verifiesOtp controller : ${error}`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not exists",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        message: "Password incorrect",
      });
    }
    const token = generateToken(user?._id);

    res.status(200).json({
      message: "Login successfully",
      user: {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in login controller : ${error.message}`,
    });
    console.log(`Error in login controller : ${error}`);
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not exists",
      });
    }
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const link = `${process.env.APP_LINK}/api/user/reset-password?resetToken=${resetToken}`;
    resetPasswordMail(user.email, `Click here to reset your password: ${link}`);
    await user.save();
    res.status(200).json({
      message: `Reset password link has been sent to email : ${user?.email}`,
      resetToken,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in forgetPassword controller : ${error.message}`,
    });
    console.log(`Error in forgetPassword controller : ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.query;
    if (!resetToken) {
      return res.status(404).json({
        message: `Token not provided or token expired`,
      });
    }
    let payload;
    try {
      payload = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (error) {
      console.log(`Error in verfiying reset Token`);
      res.status(404).json({
        message: `Error in verfiying reset Token`,
      });
    }

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { password, repeatPassword } = req.body;
    if (password.toString() !== repeatPassword.toString()) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    user.password = hashPassword;
    await user.save();

    res.status(201).json({
      message: `New password created`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error in resetPassword controller : ${error.message}`,
    });
    console.log(`Error in resetPassword controller : ${error}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user?.id;
  } catch (error) {
    res.status(500).json({
      message: `Error in updateUser controller : ${error.message}`,
    });
    console.log(`Error in updateUser controller : ${error}`);
  }
};

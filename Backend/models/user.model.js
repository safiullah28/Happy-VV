import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      deafult: null,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpExpire: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      unique: true,
      default: null,
    },
    resetTokenExpire: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

import express from "express";
const userRouter = express.Router();
import {
  forgetPassword,
  login,
  register,
  resetPassword,
  setPassword,
  verifiesOtp,
} from "../controllers/user.controller.js";

userRouter.post("/register", register);
userRouter.post("/verifyOTP", verifiesOtp);
userRouter.post("/setPassword", setPassword);
userRouter.post("/login", login);
userRouter.post("/forget-password", forgetPassword);
userRouter.patch("/reset-password", resetPassword);

export default userRouter;

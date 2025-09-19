import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers("authorization");
    if (token && token.startsWith["Bearer"]) {
      token = token.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(404).json({
        message: "Token not provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        message: "Token expired or malformed",
      });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(200).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: `Error in verifyToken controller : ${error.message}`,
    });
    console.log(`Error in verifyToken controller : ${error}`);
  }
};

import jwt from "jsonwebtoken";
export const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  return token;
};

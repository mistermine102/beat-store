import jwt from "jsonwebtoken";

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(user, secret);
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

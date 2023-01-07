import dotenv from "dotenv";
import appError from "../utils/AppError.js";
import UserModel from "../models/user.js";
dotenv.config();

import { verifyToken } from "../utils/jwt.js";

export function isLoggedIn(req, res, next) {
  if (!req.user) throw new appError(400, "You must be logged in");
  next();
}

export async function setUser(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return next()
  }

  const token = auth.split(" ")[1];
  let userId = verifyToken(token);

  userId = userId.substring(1, userId.length - 1);

  const user = await UserModel.findById(userId);
  user.password = null;

  req.user = user;

  next();
}

import dotenv from "dotenv";
import appError from "../utils/AppError.js";
import UserModel from "../models/user.js";
import FileModel from "../models/file.js";
dotenv.config();

import { verifyToken } from "../utils/jwt.js";

export function isLoggedIn(req, res, next) {
  if (!req.user) throw new appError(400, "You must be logged in");
  next();
}

export async function setUser(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return next();
  }

  const token = auth.split(" ")[1];
  let userId;

  try {
    userId = verifyToken(token);
  } catch (err) {
    return next();
  }

  userId = userId.substring(1, userId.length - 1);

  const user = await UserModel.findById(userId).populate("beats");
  if (!user) return next()

  user.password = null;

  req.user = user;

  next();
}

export async function authorizeBeat(req, res, next) {
  const { id } = req.params;

  const beat = await FileModel.findById(id);

  if (!req.user._id.equals(beat.author)) {
    throw new appError(403, "You're not an author of this beat");
  }
  next();
}

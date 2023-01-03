import env from "dotenv";
env.config();

import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import appError from "../utils/AppError.js";
import { signToken, verifyToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  //check if email is free
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) throw new appError(400, "Email exists");

  //validate email and password
  if (!email || email.length === 0 || !email.includes("@")) throw new appError(400, "Invalid email");
  if (!password || password.length < 6) throw new appError(400, "Password must be at least 6 characters long");

  //hash password & create new User
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  //send token and user to the client
  newUser.password = null;

  const token = signToken(JSON.stringify(newUser._id));

  res.json({
    token,
    user: newUser,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  //authentication
  const foundUser = await UserModel.findOne({ email });

  if (!foundUser) {
    throw new appError(400, "Wrong email or password");
  }

  const isCorrect = await bcrypt.compare(password, foundUser.password);

  //sending json web token with an id

  if (!isCorrect) {
    throw new appError(400, "Wrong email or password");
  }

  foundUser.password = null;
  const token = signToken(JSON.stringify(foundUser._id));

  res.json({
    token,
    user: foundUser,
  });
};

export const user = async (req, res) => {
  if (!req.user) throw new appError(500, "user route no req.user");
  res.send(req.user);
};

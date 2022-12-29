import env from "dotenv";
env.config();

import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appError from "../utils/AppError.js";

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(user, secret);
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    throw new appError(400, "Email exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.json("Registration success");
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

  const token = signToken(JSON.stringify(foundUser._id));

  res.send({
    token,
  });
};

export const user = async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) {
    throw new appError(400, "No token");
  }

  const token = auth.split(" ")[1];

  let userId = verifyToken(token);

  userId = userId.substring(1, userId.length - 1);

  const foundUser = await UserModel.findById(userId);

  foundUser.password = null;

  res.json({ user: foundUser });
};

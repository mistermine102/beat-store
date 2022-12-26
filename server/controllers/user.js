import env from "dotenv";
env.config();

import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(user, secret);
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    return res.status(404).send("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = signToken(JSON.stringify(newUser));

  res.status(200).json(token);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //authentication
  const foundUser = await UserModel.findOne({ email });

  const isCorrect = await bcrypt.compare(password, foundUser.password);

  //sending json web token with an id
  if (isCorrect) {
    const token = signToken(JSON.stringify(foundUser._id));
    res.send({
      token,
      user: foundUser,
    });
  }
};

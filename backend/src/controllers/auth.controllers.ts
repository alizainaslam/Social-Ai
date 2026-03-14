import { type Request, type Response } from "express";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const isExistingUser: string | null = await userModel.findOne({ username });

  if (isExistingUser) {
    return res.status(401).json({
      message: "User name is taken",
    });
  }

  const newUser = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string);

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registerd successfully",
    newUser,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token: string = jwt.sign(
    { id: user?._id },
    process.env.JWT_SECRET as string,
  );
  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successfully",
  });
};

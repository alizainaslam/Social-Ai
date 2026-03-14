import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrized access, please login first",
    });
  }

  try {
    const decoded: string | JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const user = await userModel.findById(decoded?.id);
    (req as any).user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthrized token",
    });
  }
};

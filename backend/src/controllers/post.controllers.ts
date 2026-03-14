import type { Request, Response } from "express";
import generateCaption from "../services/ai.service.js";
import uploadFile from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";
import postModel from "../models/post.model.js";

export const postController = async (req: Request, res: Response) => {
  const file: Express.Multer.File = req.file as Express.Multer.File;

  if (!file) {
    return res.status(400).json({
      message: "File not uploaded",
    });
  }

  try {
    const base64: string = file.buffer.toString("base64");

    const [caption, result] = await Promise.all([
      generateCaption(base64),
      uploadFile(req.file?.buffer || Buffer.alloc(0), `${uuidv4()}`),
    ]);

    const post = await postModel.create({
      imageUrl: result || "",
      caption,
      user: (req as any).user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error generating caption",
    });
  }
};

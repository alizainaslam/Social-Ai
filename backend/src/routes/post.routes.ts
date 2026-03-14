import express from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { postController } from "../controllers/post.controllers.js";

const postRouter = express.Router();
const uplaod = multer({ storage: multer.memoryStorage() });

postRouter.post("/", authMiddleware, uplaod.single("image"), postController);

export default postRouter;

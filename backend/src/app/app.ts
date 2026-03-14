import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../routes/auth.routes.js";
import postRouter from "../routes/post.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/captions", postRouter);

export default app;

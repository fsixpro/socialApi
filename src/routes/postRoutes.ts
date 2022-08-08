import { authMiddleware } from "./../middlewares/authMiddleware";
import { createPost } from "./../controllers/postController";
import { Router } from "express";

const postRouter = Router();

postRouter.post("/", authMiddleware, createPost);

export default postRouter;

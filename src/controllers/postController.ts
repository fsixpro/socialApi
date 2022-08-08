import { NextFunction, Response, Request } from "express";
import { postSchema } from "./../validationShema/postSchema";
import Post from "./../model/PostModel";
import ErrorResponse from "./../utils/ErrorResponse";

type Req = Request & { userId?: string };

export const createPost = async (req: Req, res: Response, next: NextFunction) => {
  const { error, value } = postSchema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400));
  }
  try {
    const image = value.image.split(",");

    const post = await Post.create({ ...value, image, user: req.userId });
    return res.status(201).json({
      success: true,
      msg: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

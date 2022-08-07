import { NextFunction, Request, Response } from "express";
import { registerSchema } from "../validationShema/authSchema";
import User from "../model/UserModel";
import generateToken from "../utils/generateToken";
import ErrorResponse from "../utils/ErrorResponse";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      msg: error.details[0].message,
      // data: {},
    });
  }

  try {
    const user = await User.create(value);

    const token = generateToken(String(user._id));
    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      data: {
        email: user.email,
        token,
      },
    });
  } catch (error) {
    if (error.message.includes("duplicate key error"))
      return res.status(400).json({
        success: false,
        msg: "User already exists",
        data: {},
      });

    return next(new ErrorResponse(error.message, 500));
  }
};

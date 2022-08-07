import { NextFunction, Request, Response } from "express";
import { registerSchema, loginSchema } from "../validationShema/authSchema";
import User from "../model/UserModel";
import generateToken from "../utils/generateToken";
import { verify } from "argon2";
import ErrorResponse from "../utils/ErrorResponse";

type Req = Request & { userId?: string };

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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400));
  }

  try {
    const user = await User.findOne({ email: value.email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const isMatch = await verify(user.password, value.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    const token = generateToken(String(user._id));
    return res.status(200).json({
      success: true,
      msg: "User logged in successfully",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token,
      },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

export const me = async (req: Req, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      msg: "User found",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
};

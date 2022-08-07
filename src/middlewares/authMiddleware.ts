import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";

type Req = Request & { userId?: string };

type AuthMiddleware = (req: Req, res: Response, next: NextFunction) => void;

export const authMiddleware: AuthMiddleware = (req, _res, next) => {
  let authorization = req.headers["authorization"];
  if (!authorization) {
    return next(new ErrorResponse("No token provided", 401));
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded: JwtPayload & { userId?: string } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { id?: string };

    req.userId = decoded.id as string;
    next();
  } catch (err) {
    return next(new ErrorResponse("Invalid token", 401));
  }
};

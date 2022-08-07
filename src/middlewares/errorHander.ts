import { Errback, Request, Response, NextFunction } from "express";

type Err = Errback & { statusCode: number; message: string };

type ErrorHandler = (err: Err, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  console.log(err);
  res.status(err.statusCode).json({
    success: false,
    msg: err.message,
    data: {},
  });
};

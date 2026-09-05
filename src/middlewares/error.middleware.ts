import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong";

  return res.status(500).json({
    success: false,
    message,
  });
};
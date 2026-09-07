import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import {
  getAllUsers,
  updateUserStatus,
} from "./admin.service";

export const getUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllUsers(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const changeUserStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await updateUserStatus(
      req.user.userId,
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import {
  getAdminBloodRequests,
  getAdminDonations,
  getAdminPayments,
  getAdminStats,
  getAllUsers,
  updateBloodRequestStatus,
  updateUserStatus,
  verifyDonation,
} from "./admin.service";

export const getUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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
      req.body,
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

export const verifyDonationController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await verifyDonation(
      req.user.userId,
      req.params.id as string,
    );

    return res.status(200).json({
      success: true,
      message: "Donation verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminBloodRequestsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAdminBloodRequests(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Blood requests fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminBloodRequestStatusController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await updateBloodRequestStatus(
      req.user.userId,
      req.params.id as string,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Blood request status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminDonationsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAdminDonations(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Donations fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminPaymentsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAdminPayments(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// STATES
export const getAdminStatsController = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAdminStats();

    return res.status(200).json({
      success: true,
      message: "Admin statistics fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

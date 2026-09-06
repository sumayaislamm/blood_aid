import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import {
  createDonation,
  getDonationById,
  getMyDonations,
  updateDonationStatus,
} from "./donation.service";
import type { GetMyDonationsQuery } from "./donation.interface";

export const createDonationController = async (
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

    const donation = await createDonation(
      req.user.userId,
      req.params.responseId as string,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Donation created successfully",
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

// Get my donations for the authenticated donor
export const getMyDonationsController = async (
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

    const result = await getMyDonations(
      req.user.userId,
      req.query as GetMyDonationsQuery,
    );

    return res.status(200).json({
      success: true,
      message: "My donations fetched successfully",
      data: result.donations,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// Get donation by ID for the authenticated donor
export const getDonationByIdController = async (
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

    const donation = await getDonationById(
      req.user.userId,
      req.params.id as string,
    );

    return res.status(200).json({
      success: true,
      message: "Donation fetched successfully",
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDonationStatusController = async (
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

    const donation = await updateDonationStatus(
      req.user.userId,
      req.params.id as string,
      req.body.status,
    );

    return res.status(200).json({
      success: true,
      message: "Donation status updated successfully",
      data: donation,
    });
  } catch (error) {
    next(error);
  }
};

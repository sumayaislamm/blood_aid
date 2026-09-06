import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import {
  createDonorResponse,
  getMyDonorResponses,
  updateDonorResponseStatus,
  updateMyDonorResponse,
} from "./donor-response.service";

export const createResponse = async (
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

    const response = await createDonorResponse(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Donor response created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// Get my donor responses for the authenticated donor
export const getMyResponses = async (
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

    const responses = await getMyDonorResponses(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Donor responses fetched successfully",
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

// Update my donor response for the authenticated donor
export const updateMyResponse = async (
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

    const response = await updateMyDonorResponse(
      req.user.userId,
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Donor response updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// Update donor response status for the authenticated donor
export const updateResponseStatus = async (
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

    const response = await updateDonorResponseStatus(
      req.user.userId,
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Donor response status updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
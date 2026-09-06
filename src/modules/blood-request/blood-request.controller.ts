
import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import {
  createBloodRequest,
  deleteBloodRequest,
  getAllBloodRequests,
  getBloodRequestById,
  getBloodRequestResponses,
  updateBloodRequest,
} from "./blood-request.service";
import type { GetBloodRequestsQuery } from "./blood-request.interface";

// Creates a new blood request in the database
export const createRequest = async (
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

    const bloodRequest = await createBloodRequest(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      data: bloodRequest,
    });
  } catch (error) {
    next(error);
  }
};

// Fetches all blood requests from the database
export const getAllRequests = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await getAllBloodRequests(
      req.query as GetBloodRequestsQuery
    );

    return res.status(200).json({
      success: true,
      message: "Blood requests fetched successfully",
      data: requests.requests,
      pagination: requests.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const request = await getBloodRequestById(id as string);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Blood request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blood request fetched successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

// Updates a blood request in the database
export const updateRequest = async (
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

    const { id } = req.params;

    const updatedRequest = await updateBloodRequest(
      id as string,
      req.user.userId,
      req.body
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message:
          "Blood request not found or you do not have permission to update it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blood request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    next(error);
  }
};

// Deletes a blood request from the database
export const deleteRequest = async (
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

    const { id } = req.params;

    const deletedRequest = await deleteBloodRequest(
      id as string,
      req.user.userId
    );

    if (!deletedRequest) {
      return res.status(404).json({
        success: false,
        message:
          "Blood request not found or you do not have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blood request deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Fetches all donor responses for a specific blood request
export const getRequestResponses = async (
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

    const responses = await getBloodRequestResponses(
      req.user.userId,
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Blood request responses fetched successfully",
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

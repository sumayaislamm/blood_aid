import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { createDonorProfile, getMyDonorProfile, updateMyDonorProfile } from "./donor-profile.service";

export const createProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile = await createDonorProfile(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Donor profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create donor profile",
    });
  }
};

// Get donor profile by userId
export const getMyProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile = await getMyDonorProfile(req.user.userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Donor profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Donor profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch donor profile",
    });
  }
};

// Update donor profile by userId
export const updateMyProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile = await updateMyDonorProfile(
      req.user.userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Donor profile updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update donor profile",
    });
  }
};
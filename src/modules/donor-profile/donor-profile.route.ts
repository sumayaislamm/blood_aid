import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";
import { createProfile, getMyProfile, updateMyProfile } from "./donor-profile.controller.js";
import { createDonorProfileSchema, updateDonorProfileSchema } from "./donor-profile.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("DONOR"),
  validate(createDonorProfileSchema),
  createProfile
);
// Get donor profile by userId
router.get(
  "/me",
  authenticate,
  authorize("DONOR"),
  getMyProfile
);
// Update donor profile by userId
router.patch(
  "/me",
  authenticate,
  authorize("DONOR"),
  validate(updateDonorProfileSchema),
  updateMyProfile
);
export default router;
import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";
import { createDonationController, getDonationByIdController, getMyDonationsController, updateDonationStatusController } from "./donation.controller.js";
import { createDonationSchema, updateDonationStatusSchema } from "./donation.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/response/:responseId",
  authenticate,
  authorize("DONOR"),
  validate(createDonationSchema),
  createDonationController
);
router.get(
  "/my-donations",
  authenticate,
  authorize("DONOR"),
  getMyDonationsController
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("DONOR"),
  validate(updateDonationStatusSchema),
  updateDonationStatusController
);
router.get(
  "/:id",
  authenticate,
  authorize("DONOR"),
  getDonationByIdController
);
export default router;
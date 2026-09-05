import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { createDonationController, getDonationByIdController, getMyDonationsController } from "./donation.controller";

const router = Router();

router.post(
  "/response/:responseId",
  authenticate,
  authorize("DONOR"),
  createDonationController
);
router.get(
  "/my-donations",
  authenticate,
  authorize("DONOR"),
  getMyDonationsController
);

router.get(
  "/:id",
  authenticate,
  authorize("DONOR"),
  getDonationByIdController
);
export default router;
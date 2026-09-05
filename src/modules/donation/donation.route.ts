import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { createDonationController } from "./donation.controller";

const router = Router();

router.post(
  "/response/:responseId",
  authenticate,
  authorize("DONOR"),
  createDonationController
);

export default router;
import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { createPaymentSchema } from "./payment.validation";
import { initiatePayment } from "./payment.controller";

const router = Router();

router.post(
  "/initiate",
  authenticate,
  authorize("REQUESTER"),
  validate(createPaymentSchema),
  initiatePayment
);

export default router;
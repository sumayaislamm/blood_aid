import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { createPaymentSchema } from "./payment.validation";
import { initiatePayment, getPaymentById } from "./payment.controller";


const router = Router();

router.post(
  "/initiate",
  authenticate,
  authorize("REQUESTER"),
  validate(createPaymentSchema),
  initiatePayment
);
router.get(
  "/:id",
  authenticate,
  authorize("REQUESTER"),
  getPaymentById
);

export default router;
import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { createPaymentSchema } from "./payment.validation.js";
import { initiatePayment, getPaymentById } from "./payment.controller.js";


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
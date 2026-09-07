import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";
import { createResponse, getMyResponses, updateMyResponse, updateResponseStatus } from "./donor-response.controller.js";
import { createDonorResponseSchema, updateDonorResponseSchema } from "./donor-response.validation.js";
import { validate } from "../../middlewares/validation.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("DONOR"),
  validate(createDonorResponseSchema),
  createResponse
);

router.get(
  "/my-responses",
  authenticate,
  authorize("DONOR"),
  getMyResponses
);
router.patch(
  "/:id/status",
  authenticate,
  authorize("REQUESTER"),
  updateResponseStatus
);

router.patch(
  "/:id",
  authenticate,
  authorize("DONOR"),
  validate(updateDonorResponseSchema),
  updateMyResponse
);




export default router;
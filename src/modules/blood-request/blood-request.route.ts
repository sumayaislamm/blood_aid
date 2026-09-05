import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createRequest, deleteRequest, getAllRequests, getRequestById, getRequestResponses, updateRequest } from "./blood-request.controller";
import { validate } from "../../middlewares/validation.middleware";

import {
  createBloodRequestSchema,
  updateBloodRequestSchema,
} from "./blood-request.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("REQUESTER"),
  validate(createBloodRequestSchema),
  createRequest
);
router.get(
  "/",
  authenticate,
  getAllRequests
);
router.get(
  "/:id/responses",
  authenticate,
  authorize("REQUESTER"),
  getRequestResponses
);
router.get(
  "/:id",
  authenticate,
  getRequestById
);
router.patch(
  "/:id",
  authenticate,
  authorize("REQUESTER"),
  validate(updateBloodRequestSchema),
  updateRequest
);
router.delete(
  "/:id",
  authenticate,
  authorize("REQUESTER"),
  deleteRequest
);


export default router;
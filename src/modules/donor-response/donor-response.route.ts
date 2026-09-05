import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { createResponse, getMyResponses, updateMyResponse } from "./donor-response.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("DONOR"),
  createResponse
);

router.get(
  "/my-responses",
  authenticate,
  authorize("DONOR"),
  getMyResponses
);

router.patch(
  "/:id",
  authenticate,
  authorize("DONOR"),
  updateMyResponse
);
export default router;
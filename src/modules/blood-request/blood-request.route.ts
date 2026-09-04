import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware";
import { createRequest } from "./blood-request.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("REQUESTER"),
  createRequest
);

export default router;
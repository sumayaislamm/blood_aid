import { Router } from "express";
import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import {
  getUsers,
  changeUserStatus,
  verifyDonationController,
} from "./admin.controller";
import {
  getUsersQuerySchema,
  updateUserStatusSchema,
} from "./admin.validation";

const router = Router();

router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validate(getUsersQuerySchema),
  getUsers
);

router.patch(
  "/users/:id/status",
  authenticate,
  authorize("ADMIN"),
  validate(updateUserStatusSchema),
  changeUserStatus
);

router.patch(
  "/donations/:id/verify",
  authenticate,
  authorize("ADMIN"),
  verifyDonationController
);

export default router;